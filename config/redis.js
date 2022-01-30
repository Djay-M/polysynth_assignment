const redisclient = require('redis');
const Promise = require('bluebird');
const { redis } = require('./vars');

Promise.promisifyAll(redisclient);

const client = redisclient.createClient({
  host: redis.endpoint
});

client.connect()

module.exports = client;
