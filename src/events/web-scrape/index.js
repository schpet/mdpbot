let arc = require("@architect/functions")

const scraper = require("./scraper")
/** @type {import('../../shared/persistence')} */
const persistence = require("@architect/shared/persistence")
const notifications = require("./notifications")
const events = require("./events")

async function handler(record, callback) {
  try {
    console.log(`web-scrape started`)

    // keeping emails in .arc-env is currently screwed up
    // https://github.com/arc-repos/architect/issues/298
    const recipientEmails =
      process.env.RECIPIENT_EMAILS || "peter@peterschilling.org,himynameisregina@gmail.com,bwr@tinycandyhammers.com"
    const recipients = recipientEmails.split(",")

    const start = new Date()

    const data = await scraper.scrape()

    const { body: previousDataSerialized } = await persistence.read()
    const previousData = previousDataSerialized
      ? events.deserialize(previousDataSerialized)
      : []

    const newEvents = events.getNewEvents(previousData, data)

    // only write to s3 if files differ
    const dataSerialized = JSON.stringify(data)
    if (dataSerialized !== previousDataSerialized) {
      await persistence.write(dataSerialized)
    }

    if (newEvents.length > 0) {
      const message = events.newEventsMessage(newEvents)
      await Promise.all([
        notifications.sendEmail({
          to: recipients,
          body: message.body,
          subject: message.subject
        }),
        notifications.snsPublish({
          subject: message.subject,
          body: message.body
        })
      ])
    }

    const end = new Date()
    const diff = end.getTime() - start.getTime()

    console.log(`web-scrape finished in ${diff}ms`)

    callback()
  } catch (e) {
    callback(e)
  }
}

exports.handler = arc.events.subscribe(handler)
