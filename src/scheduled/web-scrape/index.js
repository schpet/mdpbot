const arc = require("@architect/functions")
const puppeteer = require("puppeteer")

function handler(event, callback) {
  console.log(JSON.stringify(event, null, 2))
  callback()
  return "cool!"
}

async function getPage() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto("https://mydiscoverypass.quipugroup.net")
  await page.screenshot({ path: "example.png" })

  await browser.close()
}

exports.handler = arc.scheduled(handler)
exports.getPage = getPage
