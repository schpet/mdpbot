var test = require("tape")
var scrape = require("./index")

test("timing test", async function(t) {
  t.plan(1)
  t.equal(await scrape.getPage(), "cool")
})
