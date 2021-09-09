const combineRouters = require('koa-combine-routers');

const pingRouter = require('./ping');
const subscriptionsRouter = require('./subscriptions');
const sseRouter = require('./sse');

const router = combineRouters(
  pingRouter,
  subscriptionsRouter,
  sseRouter,
);

module.exports = router;
