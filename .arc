@app
mdpbot

@http
get /
post /scrape
post /reset

@events
web-scrape
simple

@scheduled
periodic-scrape rate(4 hours)

@tables
