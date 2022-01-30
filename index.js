const { port, env } = require('./config/vars');
const app = require('./config/express');
const chainLink = require('./config/chainlink');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, async () => {
  console.log(`LRU Cache Server started on ${port}! ENV: (${env})`);
  // await chainLink.fetchPricesInIntervals();
});

const routes = require('./src/api/routes');

// mount api routes
app.use(routes);

/**
* Exports express
* @public
*/
module.exports = app;