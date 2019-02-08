const arc = require('@architect/functions')
/** @type {import('../../shared/persistence')} */
const persistence = require("@architect/shared/persistence")

const url = arc.http.helpers.url

exports.handler = async function http(req) {
  persistence.write("[]")
  return {
    status: 302,
    location: url("/")
  }
}