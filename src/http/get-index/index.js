let arc = require('@architect/functions')
let url = arc.http.helpers.url

/** @type {import('../../shared/persistence')} */
const persistence = require("@architect/shared/persistence")

exports.handler = async function http(req) {
  console.log(req)

  const start = new Date()

  const message = await (async () => {
    try {
      const file = await persistence.read()
      return `${JSON.stringify(file)}`
    } catch (err) {
      return `uh oh: ${JSON.stringify(err)}`
    }
  })()

  const end = new Date()
  const diff = end.getTime() - start.getTime()

  return {
    type: "text/html; charset=utf8",
    body: `
<!doctype html>
<html>
<body>
<h1>Scrapy</h1>
<pre>
s3 took ${diff}ms to respond with ${message}
</pre>

<form action=${url('/scrape')} method=post>
  <button type=submit>Scrape 'n 💌</button>
</form>

</body>
</html>`
  }
}
