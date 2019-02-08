const arc = require("@architect/functions")

const scraper = require("./scraper")

/** @type {import('../../shared/persistence')} */
const persistence = require("@architect/shared/persistence")

const notifications = require("./notifications")
const events = require("./events")

async function handler(event, callback) {
  const data = await scraper.scrape()

  const previousDataSerialized = await persistence.read()
  const previousData = previousDataSerialized
    ? JSON.parse(previousDataSerialized.data)
    : []

  const newEvents = events.getNewEvents(previousData, data)

  await persistence.write(JSON.stringify(data))

  if (newEvents.length > 0) {
    const message = events.newEventsMessage(newEvents)
    await notifications.notify(message)
  }

  callback()
}

exports.handler = arc.scheduled(handler)
