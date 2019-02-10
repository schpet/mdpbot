@app
mdpbot

@http
get /
post /scrape
post /reset
post /whoops

@events
web-scrape

@scheduled
periodic-scrape rate(4 hours)

@tables
