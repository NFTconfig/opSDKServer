const router = require('koa-router')()
const scanClient = require("@layerzerolabs/scan-client");
require('dotenv').config();

const client = scanClient.createClient(process.env.CLIENT_NETWORK);

router.post('/layerzerolabs/client', async (ctx, next) => {
  let body = ctx.request.body;
  let method = body.method;
  let params = body.params;
  try {
    let res = await client[method](...params);
    ctx.body = res;
  } catch (error) {
    ctx.body = error;
  }
})

router.post('/layerzerolabs/scan', async (ctx, next) => {
  let body = ctx.request.body;
  let method = body.method;
  let params = body.params;
  try {
    let res = await scanClient[method](...params);
    ctx.body = res;
  } catch (error) {
    ctx.body = error;
  }
})

module.exports = router
