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

3. diff the data structure against a previously persisted one (or [] as default)
   - report if venue is new and it has events
   - report if venue's events include events that were not in the previously persisted one
5. persist new data structure

persistence: single S3 json file?
