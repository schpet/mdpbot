const aws = require("aws-sdk")

const bucket = process.env.BUCKET
const key = `MYdiscoverpass-${process.env.NODE_ENV}.json`

if (!bucket) throw new Error("invariant: expected bucket")

/**
 * @returns {Promise<{data: string, lastModified: Date}|null>}
 */
async function read() {
  const s3 = new aws.S3({ region: process.env.AWS_REGION })
  try {
    const file = await s3.getObject({ Bucket: bucket, Key: key }).promise()
    return {
      data: file.Body.toString(),
      lastModified: new Date(file.LastModified)
    }
  } catch (e) {
    if (e.code === "NoSuchKey") {
      return null
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
