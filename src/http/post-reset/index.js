const arc = require("@architect/functions")
/** @type {import('../../shared/persistence')} */
const persistence = require("@architect/shared/persistence")

const url = arc.http.helpers.url

exports.handler = async function http(req) {
  console.log("resetting s3...")
  try {
    await persistence.write("[]")
    return {
      status: 302,
      location: url("/")
    }
  } catch (e) {
    return {
      type: "text/plain; charset=utf8",
      body: `uh oh! failed with: ${JSON.stringify(e)}`
    }
  }
}
