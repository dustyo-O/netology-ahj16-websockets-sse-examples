const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const WS = require('ws');
const router = require('./routes');

const app = new Koa();


app.use(koaBody({
  json: true,
}));

app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    return await next();
  }

  const headers = { 'Access-Control-Allow-Origin': '*', };

  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({ ...headers });
    try {
      return await next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }

  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });

    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Request-Headers'));
    }

    ctx.response.status = 204;
  }
});

// TODO: write code here

app.use(router());

const chat = [];

const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());

const wsServer = new WS.Server({
  server
});

wsServer.on('connection', (ws) => {
  const errCallback = (e) => { console.log(e); };

  ws.on('message', (e) => {
    console.log(e);

    chat.push(e);

    Array.from(wsServer.clients)
      .filter(client => client.readyState === WS.OPEN)
      .forEach(client => client.send(JSON.stringify({ message: e })));

  });

  ws.send(JSON.stringify({ chat }), errCallback);
});

server.listen(port);
