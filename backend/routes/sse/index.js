const Router = require('koa-router');
const { streamEvents } = require('http-event-stream');
const subscriptions = require('../../db/subscriptions');

const router = new Router();


router.get('/sse', async (ctx) => {
  streamEvents(ctx.req, ctx.res, {
    async fetch(lastEventId) {
      console.log(lastEventId);

      return [];
    },
    stream(sse) {
      function sendSubscriptionsData(db, item) {
        sse.sendEvent({
          data: JSON.stringify({
            count: db.length,
            item,
          }),
          id: item.phone
        });
      }

      subscriptions.listen(sendSubscriptionsData);

      sendSubscriptionsData(subscriptions.db, {});

      return () => {};
    }
  });

  ctx.respond = false;
});

module.exports = router;
