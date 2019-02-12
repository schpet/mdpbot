const arc = require("@architect/functions")
const notifications = require("./notifications")

async function handler(record, callback) {
  console.log(JSON.stringify(record, null, 2))
  try {
    // keeping emails in .arc-env is currently screwed up
    // https://github.com/arc-repos/architect/issues/298
    const recipientEmails =
      process.env.RECIPIENT_EMAILS || "peter@peterschilling.org"
    const recipients = recipientEmails.split(",")

    const { body, subject } = eventsEmail(record.events)
    await notifications.notify({
      to: recipients,
      body,
      subject
    })
    callback()
  } catch (e) {
    callback(e)
  }
}

/** @param {MY.Venue[]} events */
const eventsEmail = events => {
  const venueSummary = events.map(e => e.venue).join(", ")
  const subject = `New events at ${venueSummary}`

  const hr = "🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫\n"
  const hr2 = "🎫➕🎫➕🎫➕🎫\n"

  const body = events
    .map(
      e =>
        `${hr}${e.venue}\n🌐 ${e.url}\n${hr}\n${e.events
          .map(x => `${x}\n`)
          .join(`\n${hr2}\n`)}`
    )
    .join("\n")

  return { subject, body }
}

exports.handler = arc.events.subscribe(handler)
exports.eventsEmail = eventsEmail