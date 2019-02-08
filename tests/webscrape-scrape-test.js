require("./env")
const fs = require('fs').promises
var test = require("tape")
var scrape = require("../src/events/web-scrape/scraper")

test.skip("print scrape results", async t => {
  t.plan(1)
  const result = await scrape.scrape()
  console.log(result)

  t.ok(true)
})

// put this in some tasks dir, and run it from package.json?
test.skip("update fixtures", async t => {
  require("./env.js")
  t.plan(1)
  const scrapeResult = await scrape.scrape()
  const json = JSON.stringify(scrapeResult)
  await fs.writeFile(__dirname + '/fixtures/real-sample.json', json, 'utf8')
  t.ok(true, "finished! run prettify on that thing")
})