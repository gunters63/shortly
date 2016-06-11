"use strict";

var express = require('express');
var bluebird = require('bluebird');
var router = express.Router();
var redis = require('redis');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

var client = redis.createClient();

const baseUrl = 'http://localhost:3000/';

/* POST for short url creation. */
router.get('/:shortUrl', function (req, res, next) {
  client.hgetAsync('url', req.params.shortUrl)
  // Todo write analytics information in the redis DB
    .then((longUrl) => {
      res.redirect(longUrl);
    })
    .catch(err => {
        res.json(400, {status: 'error', reason: 'Internal error', message: 'error'})
      }
    )
});

module.exports = router;
