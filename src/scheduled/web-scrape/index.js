let arc = require('@architect/functions')

function handler(event, callback) {
  console.log(JSON.stringify(event, null, 2))
  callback()
  return 'cool!'
}

function getPage() {
  return "cool"
}

exports.handler = arc.scheduled(handler)
exports.getPage = getPage
