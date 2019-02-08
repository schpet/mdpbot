/** @type {any} */
const chromium = require("chrome-aws-lambda")
const puppeteer = chromium.puppeteer

// https://github.com/alixaxel/chrome-aws-lambda/issues/7#issuecomment-450402988

/**
 * @param {string} [venueFocus]
 * @returns {Promise<MY.Venue[]>}
 */
async function scrape(venueFocus) {
  const username = process.env.USERNAME
  const password = process.env.PASSWORD

  // @ts-ignore
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless
    // slowMo: 200
  })

  // const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto("https://mydiscoverypass.quipugroup.net")
  await page.type("#patronNumber", username)
  await page.type("#patronPassword", password)
  await page.click("#vpass_loginButton")

  await page.goto("https://mydiscoverypass.quipugroup.net/?method=Venues")

  const venueSelector = ".fieldsetVenueOffers"
  // await page.waitForSelector(venueSelector)
  await page.content()

  // Extract the results from the page.
  /** @type {{url: string, venue: string}[]} */
  const venues = await page.evaluate(venueSelector => {
    /** @type {NodeListOf<HTMLHeadingElement>} */
    const nodes = document.querySelectorAll(venueSelector)

    return [...nodes].map(node => {
      const heading = node.querySelector("h2")

      /** @type {HTMLAnchorElement} */
      const checkDatesAnchor = node.querySelector(
        'a[alt="Check Available Dates"]'
      )
      return {
        url: checkDatesAnchor.href,
        venue: heading.textContent.trim()
      }
    })
  }, venueSelector)

  const venuesToInspect = venueFocus
    ? venues.filter(v => v.venue === venueFocus)
    : venues

  const venueWithEvents = await asyncMap(venuesToInspect, async venue => {
    await page.goto(venue.url)

    const eventsSelector = ".fieldsetVenuesByDate"
    await page.content()

    /** @type {string[]} */
    const events = await page.evaluate(eventsSelector => {
      /** @type {NodeListOf<HTMLFieldSetElement>} */
      const nodes = document.querySelectorAll(eventsSelector)
      return [...nodes].map(node => node.innerText.trim())
    }, eventsSelector)

    return {
      ...venue,
      events
    }
  })

  await browser.close()

  return venueWithEvents
}

/**
 * @param {T[]} collection
 * @param {(thing: T) => Promise<V>} callback
 *
 * @template T
 * @template V
 */
async function asyncMap(collection, callback) {
  const results = []
  for (let i = 0; i < collection.length; i++) {
    const result = await callback(collection[i])
    results.push(result)
  }
  return results
}

exports.scrape = scrape