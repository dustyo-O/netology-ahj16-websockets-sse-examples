const Router = require('koa-router');

const router = new Router();

router.get('/ping', async (ctx) => {
  ctx.response.body = { status: 'ok' };
});

module.exports = router;
