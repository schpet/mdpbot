var test = require("tape")
var scrape = require("../src/scheduled/web-scrape/index")

let join = require("path").join
let parse = require("@architect/parser")
let read = require("fs").readFileSync

// load env vars
// node_modules/@architect/architect/src/util/populate-env.js
let envPath = join(process.cwd(), ".arc-env")
let raw = read(envPath).toString()
let env = parse(raw)
env[process.env.NODE_ENV].forEach(tuple => {
  process.env[tuple[0]] = tuple[1]
})

test("scrape", async t => {
  t.plan(1)
  console.log(await scrape.scrape())

  t.ok(true)
})
