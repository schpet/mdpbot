@app
testapp

@http
get /
post /scrape
post /reset

@events
web-scrape

@scheduled
web-scrape rate(4 hours)

@tables
