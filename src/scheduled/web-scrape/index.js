const arc = require("@architect/functions")
// const puppeteer = require("puppeteer")

function handler(event, callback) {
  console.log(JSON.stringify(event, null, 2))
  console.log("web scrape called!")
  callback()
  return "cool!"
}

exports.handler = arc.scheduled(handler)
exports.getPage = getPage
