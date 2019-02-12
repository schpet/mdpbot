// @architect/functions enables secure sessions, express-style middleware and more
let arc = require("@architect/functions")

exports.handler = async function http(req) {
  await arc.events.publish({
    name: "new-events",
    payload: {
      /** @type MY.Venue[] */
      events: [
        {
          url:
            "https://mydiscoverypass.quipugroup.net/index.php?method=Dates&limitVenueId=8&mobile=0",
          venue: "Fake Theatre",
          events: ["An example event"]
        }
      ],
      duration: 30000
    }
  })

  return {
    status: 302,
    location: arc.http.helpers.url("/")
  }
}
