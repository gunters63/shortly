# shortly

Small url shortener demo for Auroras programming task.
Source were mainly generated from a Node.JS/Express template.

You can find the 'meat' in:

app.js: Addition of two route handlers for / (redirect to original long url) and /create (create shortened url)
routes/create.js: POST handler for creating shortened urls
routes/redirect.js: GET handler for redirecting to the original long urls
tests/test.js: Contains two small tests

Notes:
Source still uses randomly generated short urls. After the discussion I would rather use a simple 64-bit hash function
Lots of stuff still missing due to time ran out (url canonicalisation, analytics, caching etc.)
