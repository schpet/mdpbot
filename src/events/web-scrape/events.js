/**
 * @param {MY.Venue[]} oldVenues
 * @param {MY.Venue[]} newVenues
 * @returns {MY.Venue[]}
 */
exports.getNewEvents = function(oldVenues, newVenues) {
  return newVenues
    .map(newVenue => {
      const oldVenue = oldVenues.find(ov => ov.venue === newVenue.venue) // assumes venues are unique

      if (!oldVenue) {
        return newVenue
      }

      return {
        ...newVenue,
        events: newVenue.events.filter(
          event => oldVenue.events.indexOf(event) === -1
        )
      }
    })
    .filter(x => x.events.length > 0)
}

/**
 * @param {MY.Venue[]} events
 */
exports.newEventsMessage = events => {
  const venueSummary = events.map(e => e.venue).join(", ")
  const subject = `New events at ${venueSummary}`

  const hr = "🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫🎫\n"
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

/**
 * @param {string} file
 */
exports.deserialize = file => {
  try {
    const data = JSON.parse(file)

    if (!Array.isArray(data))
      throw new Error(`invariant: expected data to be an array, got ${file}`)

    return /** @type {MY.Venue[]} */ (data)
  } catch (e) {
    throw new Error(`failed to parse file: ${file}`)
  }
}
