let arc = require("@architect/functions")
const scraper = require("./scraper")
/** @type {import('../../shared/persistence')} */
const persistence = require("@architect/shared/persistence")
const notifications = require("./notifications")
const events = require("./events")

async function handler(record, callback) {
  try {
    console.log(`web-scrape started! 1312 username=${process.env.USERNAME}`)

    const start = new Date()

    const data = await scraper.scrape()

    const previousDataSerialized = await persistence.read()
    const previousData = previousDataSerialized
      ? events.deserialize(previousDataSerialized.data)
      : []

    const newEvents = events.getNewEvents(previousData, data)

    await persistence.write(JSON.stringify(data))

    if (newEvents.length > 0) {
      const message = events.newEventsMessage(newEvents)
      await notifications.notify({
        to: ["peter@peterschilling.org"],
        body: message.body,
        subject: message.subject
      })
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
