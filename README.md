mdpbot
------

staging
https://18q7ya2hfk.execute-api.us-west-2.amazonaws.com/staging

approach:

1. login
2. scrape the site, generate a data structure like this:

```
[
  {
    venue: "Hollywood Theatre",
    events: [
      "Boom Arts at Imago Theatre\nPortland, OR\nMobile Pass Accepted\n\nPescador (Fisherman) - This pass admits two people to the 3 pm matinee.\n"
    ]
  }, ...
]
```

3. diff the data against a previously persisted one (or [] as default)
   - report if venue is new and it has events
   - report if venue's events include events that were not in the previously persisted one
4. email new events!
5. persist new data

todo:

- alerts when failures occur (e.g. scraping changed)
- make this idempotent (i.e. persist the previous aws request id, i guess?)
- email me a stack trace or something pointign to a stack trace when things go haywire
