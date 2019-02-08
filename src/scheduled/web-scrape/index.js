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
    ? deserialize(previousDataSerialized.data)
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

  callback()
}

/**
 * @param {string} file
 */
function deserialize(file) {
  try {
    const data = JSON.parse(file)

    if (!Array.isArray(data))
      throw new Error(`invariant: expected data to be an array, got ${file}`)

    return /** @type {MY.Venue[]} */ (data)
  } catch (e) {
    throw new Error(`failed to parse file: ${file}`)
  }
}

exports.handler = arc.scheduled(handler)
