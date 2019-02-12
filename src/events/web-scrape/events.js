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
