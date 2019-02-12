var aws = require("aws-sdk")

/*
REPL

var notifications = require("./src/scheduled/web-scrape/notifications.js")
notifications.notify({ to: ["peter@peterschilling.org"], subject: "A test email from ses", body: "this is the email's body" })
*/

/**
 * @param {object} args
 * @param {string} args.subject
 * @param {string} args.body
 * @param {string[]} args.to
 */
exports.notify = async function({ to, subject, body }) {
  aws.config.update({ region: process.env.AWS_REGION })

  const nameSuffix = process.env.NODE_ENV === "testing" ? " Testing" : ""

  const params = {
    Destination: {
      ToAddresses: to
    },
    Message: {
      Body: {
        Text: { Charset: "UTF-8", Data: body }
      },
      Subject: { Charset: "UTF-8", Data: subject }
    },
    Source: `Discovery Pass Bot${nameSuffix} <discoverbot@peterschilling.org>`
  }

  await new aws.SES({ apiVersion: "2019-02-08" }).sendEmail(params).promise()
}
