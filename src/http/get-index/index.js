var aws = require("aws-sdk")
// @architect/functions enables secure sessions, express-style middleware and more
// let arc = require('@architect/functions')
// let url = arc.http.helpers.url

exports.handler = async function http(req) {
  console.log(req)
  var s3 = new aws.S3({ region: process.env.AWS_REGION })

  const bucket = process.env.BUCKET

  const start = new Date()
  const message = await (async () => {
    try {
      const filesOnS3 = await s3.listObjectsV2({ Bucket: bucket }).promise()
      return `${JSON.stringify(filesOnS3.Contents)}`
    } catch (err) {
      return `listing objects in s3 failed ${JSON.stringify(err)}`
    }
  })()
  const end = new Date()
  const diff = end.getTime() - start.getTime()

  return {
    type: "text/html; charset=utf8",
    body: `<pre>s3 took ${diff}ms to respond: ${message}</pre>`
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
