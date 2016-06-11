"use strict";

var express = require('express');
var shortid = require('shortid');
var bluebird = require('bluebird');
var router = express.Router();
var redis = require('redis');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

var client = redis.createClient();


const baseUrl = 'http://localhost:3000/';

/* POST for short url creation. */
router.post('/', function (req, res, next) {
  var id = shortid.generate();
  // Would use non-cryptographic hash function now after discussion
  // Murmurhash or FNV with 64 bits, would use only the lower 60 bits and create 10 base-64 chars
  var longUrl = req.body.url;
  Promise.all([
    client.hsetAsync('url', id, longUrl),
    // Todo write analytics information under another key in the redis DB
  ])
    .then(() => {
      res.json({'short-url': baseUrl + id});
    })
    .catch(err => {
        res.json(500, {status: 'error', reason: 'Internal error', message: 'error'})
      }
    )
});

module.exports = router;
