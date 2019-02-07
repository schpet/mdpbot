// via node_modules/@architect/architect/src/util/populate-env.js
let join = require("path").join
let parse = require("@architect/parser")
let read = require("fs").readFileSync

let envPath = join(process.cwd(), ".arc-env")
let raw = read(envPath).toString()
let env = parse(raw)
env[process.env.NODE_ENV].forEach(tuple => {
  process.env[tuple[0]] = tuple[1]
})

