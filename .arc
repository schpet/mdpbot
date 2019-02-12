@app
mdpbot

@http
get /
post /scrape
post /reset
post /whoops
post /fake-event

@events
web-scrape
new-events

@scheduled
periodic-scrape rate(4 hours)

@tables
