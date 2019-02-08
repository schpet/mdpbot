const arc = require("@architect/functions")

async function handler(event, callback) {
  await arc.events.publish({
    name: "web-scrape",
    payload: {}
  })
  callback()
}

exports.handler = arc.scheduled(handler)
