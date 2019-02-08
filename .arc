@app
testapp

@http
get /

@scheduled
web-scrape rate(4 hours)

@tables
