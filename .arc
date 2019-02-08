@app
testapp

@http
get /
post /scrape

@events
web-scrape

@scheduled
web-scrape rate(4 hours)

@tables
