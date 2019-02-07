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
  const details = events
    .map(
      e =>
        `${e.venue} (${e.url})\n\n${e.events.map(es => `- ${es}\n`).join("")}`
    )
    .join("\n")

  return {
    subject: `New events at ${venueSummary}`,
    body: `Events

${details}`
  }
}
