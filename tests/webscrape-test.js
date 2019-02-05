var test = require("tape")
var scrape = require("../src/scheduled/web-scrape/index")

test("timing test", async function(t) {
  t.plan(1)
  t.equal(await scrape.getPage(), "cool")
})
