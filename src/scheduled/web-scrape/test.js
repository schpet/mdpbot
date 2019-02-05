var test = require("tape")
var scrape = require("./index")

test("timing test", function(t) {
  t.plan(1)
  t.equal(scrape.getPage(), "cool")
})
