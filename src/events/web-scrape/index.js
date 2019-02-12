let arc = require("@architect/functions")

const scraper = require("./scraper")
/** @type {import('../../shared/persistence')} */
const persistence = require("@architect/shared/persistence")
const events = require("./events")

async function handler(record, callback) {
  try {
    console.log(`web-scrape started`)
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

    const end = new Date()
    const duration = end.getTime() - start.getTime()

    if (newEvents.length > 0) {
      await arc.events.publish({
        name: "new-events",
        payload: {
          events: newEvents,
          duration,
        }
      })
    }
    console.log(`web scrape finished in ${duration} with ${newEvents.length} events`)

    callback()
  } catch (e) {
    callback(e)
  }
}

exports.handler = arc.events.subscribe(handler)
