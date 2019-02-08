require("./env")

const sinon = require("sinon")
const aws = require("aws-sdk")
const test = require("tape")
const persistence = require("../src/shared/persistence")

/*
REPL copy/paste

var persistence = require("./src/shared/persistence")
persistence.read().then(s => console.log({ s }), err => console.log({ err }))
persistence.write('77').then(s => console.log({ s }), err => console.log({ err }))
*/

test(`read reads a file from s3`, async t => {
  t.plan(1)

  sinon.stub(aws, "S3").returns({
    getObject: sinon.stub().returns({
      promise: () => ({ Body: Buffer.from("foobar") })
    })
  })

  const result = await persistence.read()
  t.equals(result, "foobar", "reads file contents")
})
