// @architect/functions enables secure sessions, express-style middleware and more
// let arc = require('@architect/functions')
// let url = arc.http.helpers.url
const chromium = require("chrome-aws-lambda")
const puppeteer = require("puppeteer-core")

exports.handler = async function http(req) {
  console.log(req)

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless
  })

  // const browser = await puppeteer.launch()
  const page = await browser.newPage()
  // await page.goto("https://mydiscoverypass.quipugroup.net")
  await page.goto("http://peterschilling.org")
  // await page.screenshot({ path: "example.png" })
  const title = await page.title()
  console.log(`title: ${title}`)

  await browser.close()

  return {
    type: "text/html; charset=utf8",
    body: `<h1>Hello world! title=${title}</h1>`
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
