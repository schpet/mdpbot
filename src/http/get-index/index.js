// @architect/functions enables secure sessions, express-style middleware and more
// let arc = require('@architect/functions')
// let url = arc.http.helpers.url
const chromium = require("chrome-aws-lambda")
const puppeteer = chromium.puppeteer

// https://github.com/alixaxel/chrome-aws-lambda/issues/7#issuecomment-450402988

exports.handler = async function http(req) {
  console.log(req)

  const username = process.env.USERNAME
  const password = process.env.PASSWORD

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
    // slowMo: 200
  })

  // const browser = await puppeteer.launch()
  const page = await browser.newPage()


  await page.goto("https://mydiscoverypass.quipugroup.net")
  await page.type("#patronNumber", username)
  await page.type("#patronPassword", password)
  await page.click("#vpass_loginButton")

  const venueSelector = ".fieldsetVenueOffers h2"

  await page.goto("https://mydiscoverypass.quipugroup.net/?method=Venues")

  await page.waitForSelector(venueSelector);

  // Extract the results from the page.
  const venueNames = await page.evaluate(venueSelector => {
    const h2s = Array.from(document.querySelectorAll(venueSelector));
    return h2s.map(node => {
      return node.textContent
    });
  }, venueSelector);

  // await page.screenshot({ path: "example.png" })
  const title = await page.title()

  await browser.close()

  return {
    type: "text/html; charset=utf8",
    body: `<pre>${JSON.stringify({ title, venueNames }, null, '  ')}</pre>`
  }
}

// Example responses

/* Forward requester to a new path
exports.handler = async function http(request) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(request)
  }
  return {
    status: 302,
    location: '/staging/about',
  }
}
*/

/* Successful resource creation, CORS enabled
exports.handler = async function http(request) {
  return {
    status: 201,
    type: 'application/json',
    body: JSON.stringify({ok: true}),
    cors: true,
  }
}
*/

/* Deliver client-side JS
exports.handler = async function http(request) {
  return {
    type: 'text/javascript',
    body: 'console.log("Hello world!")',
  }
}
*/

// Learn more: https://arc.codes/guides/http
