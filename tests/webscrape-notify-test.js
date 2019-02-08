const test = require("tape")
const aws = require("aws-sdk")
const sinon = require("sinon")
const notifications = require("../src/events/web-scrape/notifications")

test("notify", async t => {
  t.plan(1)

  sinon.stub(aws, "SES").returns({
    sendEmail: sinon.stub().returns({
      promise: () => ({ MessageId: "1234" })
    })
  })

  await notifications.notify({ to: ["foo@x.com"], subject: "bar", body: "baz" })

  t.ok(true, "doesn't blow up")

  aws.SES.restore()
})
