const test = require("tape")
const newEvents = require("../src/events/new-events")


test("newEventsMessage builds a nice message", t => {
  t.plan(2)

  /** @type {MY.Venue[]} */
  const venues = [
    {
      venue: "Hollywood Theater",
      url: "http://hollywood.biz",
      events: ["other event"],
    },
    {
      venue: "cooltown",
      url: "http://cool.biz",
      events: ["fun times\nyep yep", "cool times"],
    }
  ]

  const message = newEvents.eventsEmail(venues)
  t.equal(message.subject, "New events at Hollywood Theater, cooltown")
  t.equal(
    message.body,
    `🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫
Hollywood Theater
🌐 http://hollywood.biz
🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫

other event

🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫
cooltown
🌐 http://cool.biz
🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫

fun times
yep yep

🎫➕🎫➕🎫➕🎫

cool times
`
  )
})