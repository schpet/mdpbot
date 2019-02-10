const arc = require('@architect/functions')
const url = arc.http.helpers.url
/** @type {import('../../shared/persistence')} */
const persistence = require("@architect/shared/persistence")

exports.handler = async function http(req) {
  console.log(req)

  const start = new Date()

  const message = await (async () => {
    try {
      const file = await persistence.read()
      if (file.body && file.lastModified) {
        return `updated ${file.lastModified.toLocaleString()}\n\n${JSON.stringify(JSON.parse(file.body), null, 2)}`
      } else {
        return `missing data... ${JSON.stringify(file)}`
      }
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

<div style="display: flex">
  <form action=${url('/scrape')} method=post>
    <button type=submit>Scrape 'n 💌</button>
  </form>

  <form action=${url('/reset')} method=post>
    <button type=submit>Reset 🧼</button>
  </form>
</div>
<br />

s3 took ${diff}ms to load:
<pre>
${message}
</pre>

</body>
</html>`
  }
}
