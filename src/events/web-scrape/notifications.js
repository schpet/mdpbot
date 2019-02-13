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
exports.sendEmail = async function({ to, subject, body }) {
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

/**
 * @param {object} args
 * @param {string} args.subject
 * @param {string} args.body
 */
exports.snsPublish = async function({ subject, body }) {
  aws.config.update({ region: process.env.AWS_REGION })

  // Create publish parameters

  await new aws.SNS()
    .publish({
      Message: JSON.stringify({ default: body, sms: subject }),
      Subject: subject,
      MessageStructure: "json",
      TopicArn:
        "arn:aws:sns:us-west-2:029393613213:mdpbot-staging-notifications" // env var?
    })
    .promise()
}
