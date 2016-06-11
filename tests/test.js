/**
 * Created by gunter on 6/9/16.
 */
"use strict";

var app = require('../app');
var bluebird = require('bluebird');
var redis = require('redis');
var expect = require('chai').expect;
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
var agent = require('supertest-as-promised').agent(app);
var client = redis.createClient();
var url = require('url');

describe('server', function () {

  beforeEach(() => {
    return client.delAsync('url')
  });

  it('POST /create should return a string', () => {
    return agent
      .post('/create')
      .send({url: 'http://example.com?xy=123'})
      .expect(200)
      .then(res => {
        expect(res.body).to.have.property('short-url');
        // a string returned in body.long-url and no error
      })
  });

  it('POST /create should return a shortened url, A GET should redirect to the long url again', () => {
    var testUrl = 'http://example.com?xy=123';
    return agent
      .post('/create')
      .send({url: testUrl})
      .expect(200)
      .then(res => {
        var shortUrl = res.body['short-url'];
        var shortPath = url.parse(shortUrl).path;
        return agent
          .get(shortPath)
          .expect(302)
      })
      .then(res => {
        console.log(res)
        expect(res.header).to.have.property('location', testUrl);
      })
  })
});
