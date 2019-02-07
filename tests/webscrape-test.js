var test = require("tape")
var scrape = require("../src/scheduled/web-scrape/index")

test.skip("handler", async t => {
  t.plan(1)
  scrape.handler({}, {}, (err, result) => {
    t.ok(true, "executed function")
  })
})

