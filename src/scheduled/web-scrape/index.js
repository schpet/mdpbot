const arc = require("@architect/functions")

const scraper = require("./scraper")
const persistence = require("./persistence")
const notifications = require("./notifications")
const events = require("./events")

async function handler(event, callback) {
  const data = await scraper.scrape()

  const previousDataSerialized = await persistence.read()
  const previousData = previousDataSerialized
    ? JSON.parse(previousDataSerialized)
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