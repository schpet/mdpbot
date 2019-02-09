let arc = require('@architect/functions')

function handler(record, callback) {
  console.log(`simple username=${process.env.USERNAME}`)
  console.log(JSON.stringify(record, null, 2))
  callback()
}

exports.handler = arc.events.subscribe(handler)