const aws = require("aws-sdk")

const bucket = "schpet-mydiscoverpass-or"
const key = `MYdiscoverpass-${process.env.NODE_ENV}.json`

/**
 * @returns {Promise<{body: string | undefined, lastModified: Date | undefined}>}
 */
async function read() {
  const s3 = new aws.S3({ region: process.env.AWS_REGION })

  try {
    const file = await s3.getObject({ Bucket: bucket, Key: key }).promise()
    return {
      body: file.Body && file.Body.toString(),
      lastModified: file.LastModified
    }
  } catch (e) {
    if (e.code === "NoSuchKey") {
      return {
        body: undefined,
        lastModified: undefined
      }
    }
    throw e
  }
}

/**
 * @param {string} value
 */
async function write(value) {
  const s3 = new aws.S3({ region: process.env.AWS_REGION })
  await s3.putObject({ Bucket: bucket, Key: key, Body: value }).promise()
}

exports.read = read
exports.write = write
exports.key = key
