const path = require('path');

// import .env variables
require('dotenv-safe').config({
  path: path.join(__dirname, '../.env'),
  sample: path.join(__dirname, '../.env.example'),
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  redis: {
    endpoint: process.env.REDIS_URI,
    cache: {
      LRU: 'LRU_Cache',
      limit: 2,
    },
  },
  chainLink: {
    endpoint: 'https://min-api.cryptocompare.com/data/pricemultifull',
    blockchains: 'ETH,BTC,MATIC,LINK,AAVE',
    currency: 'USD',
  }
}