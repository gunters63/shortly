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

Sample run:
```
node bin/www
  shortly:server Listening on port 3000 +0ms
POST /create 200 25.693 ms - 46
GET /Sy9x0GK4 302 5.858 ms - 224

Process finished with exit code 130
```

Run tests:
```
node ./node_modules/mocha/bin/_mocha --ui bdd ./tests
POST /create 200 22.918 ms - 46
POST /create 200 2.226 ms - 47
GET /Skxb45ct4 302 3.694 ms - 47

Process finished with exit code 0

```
