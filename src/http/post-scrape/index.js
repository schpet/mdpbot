let arc = require("@architect/functions")
let url = arc.http.helpers.url

exports.handler = async function http(req) {
  await arc.events.publish({ name: "web-scrape", payload: {} })
  await arc.events.publish({ name: "simple", payload: {} })
  return {
    status: 302,
    location: url("/")
  }
}
