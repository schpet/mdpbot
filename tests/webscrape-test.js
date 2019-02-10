require("./env")
const aws = require("aws-sdk")
const sinon = require("sinon")
const test = require("tape")
const scrape = require("../src/events/web-scrape/index")

test.only("webscrape.handler", async t => {
  t.plan(1)

  sinon.stub(aws, "S3").returns({
    getObject: sinon.stub().returns({
      promise: () => ({ Body: Buffer.from("[]") })
    }),
    putObject: sinon.stub().returns({
      promise: () => {}
    })
  })

  sinon.stub(aws, "SES").returns({
    sendEmail: sinon.stub().returns({
      promise: () => ({ MessageId: "1234" })
    })
  })

  const evt = mockEvent({ arcType: "event", payload: {} })
  scrape.handler(evt, {}, (err, result) => {
    t.notok(err, "executed without error")
    aws.S3.restore()
    aws.SES.restore()
  })
})

// https://github.com/arc-repos/architect/blob/a3a51a825f7c10a42b55feca1862a47eeb278525/src/sandbox/events/_subprocess.js#L24
function mockEvent(message) {
  switch (message.arcType) {
  case "event":
    return {Records:[{Sns:{Message:JSON.stringify(message.payload)}}]}; // this is fine
  case "queue":
    return { Records: [{ body: JSON.stringify(message.payload) }] }; // also fine
  default:
    throw new Error('Unrecognized event type ' + message.arcType)
  }
}
