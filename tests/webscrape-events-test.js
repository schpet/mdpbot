const test = require("tape")
const events = require("../src/events/web-scrape/events")

test("getNewEvents gives me all events for new venues", t => {
  t.plan(1)

  const a = []
  /** @type {MY.Venue[]} */
  const b = [{ events: ["fun times"], url: "", venue: "cooltown" }]

  const result = events.getNewEvents(a, b)

  t.deepEqual(result, [{ events: ["fun times"], url: "", venue: "cooltown" }])
})

test("getNewEvents gives me all new events for a venue", t => {
  t.plan(1)

  /** @type {MY.Venue[]} */
  const a = [{ events: ["fun times"], url: "", venue: "cooltown" }]

  /** @type {MY.Venue[]} */
  const b = [
    { events: ["fun times", "cool times"], url: "", venue: "cooltown" }
  ]

  const result = events.getNewEvents(a, b)

  t.deepEqual(result, [{ events: ["cool times"], url: "", venue: "cooltown" }])
})

test("getNewEvents excludes venues without events", t => {
  t.plan(1)

  /** @type {MY.Venue[]} */
  const a = []

  /** @type {MY.Venue[]} */
  const b = [{ events: [], url: "", venue: "cooltown" }]

  const result = events.getNewEvents(a, b)

  t.deepEqual(result, [])
})

test("newEventsMessage builds a nice message", t => {
  t.plan(2)

  /** @type {MY.Venue[]} */
  const venues = [
    {
      events: ["other event"],
      url: "http://hollywood.biz",
      venue: "Hollywood Theater"
    },
    {
      events: ["fun times", "cool times"],
      url: "http://cool.biz",
      venue: "cooltown"
    }
  ]

  const message = events.newEventsMessage(venues)
  t.equal(message.subject, "New events at Hollywood Theater, cooltown")
  t.equal(message.body, `Events

Hollywood Theater (http://hollywood.biz)

- other event

cooltown (http://cool.biz)

- fun times
- cool times
`
  )
})
