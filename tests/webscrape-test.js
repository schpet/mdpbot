const aws = require("aws-sdk")
const sinon = require("sinon")
const test = require("tape")
const scrape = require("../src/events/web-scrape/index")

// TODO figure out how to invoke handler?
// test.skip("handler", async t => {
//   t.plan(1)
//   sinon.stub(aws, "S3").returns({
//     getObject: sinon.stub().returns({
//       promise: () => ({ Body: Buffer.from("[]") })
//     }),
//     putObject: sinon.stub().returns({
//       promise: () => {}
//     })
//   })

//   sinon.stub(aws, "SES").returns({
//     sendEmail: sinon.stub().returns({
//       promise: () => ({ MessageId: "1234" })
//     })
//   })

//   scrape.handler({Records:[]}, {}, (err, result) => {
//     console.log({err, result})
//     t.ok(true, "executed function")
//     aws.S3.restore()
//     aws.SES.restore()
//   })
// })