'use strict';
import path from 'path';
import Koa from 'koa';
import Router from 'koa-router';
import views from 'koa-views';
import convert from 'koa-convert';
import json from 'koa-json';
import onerror from 'koa-onerror';
import bodyparser from 'koa-bodyparser';
import serve from 'koa-static';
import logger from 'koa-logger';
// import debug from 'debug';
import AV from 'leanengine';

import cros from './middleware/cros';
import index from './routes/index';
import api from './routes/api';

const APP_ID = process.env.LC_APP_ID || 'z4jzXcAKbNIa0xxluFtIuz80-gzGzoHsz';
const APP_KEY = process.env.LC_APP_KEY || 'nAxHXqjX9hHPRrlnNxoYBMYk';
const MASTER_KEY = process.env.LC_APP_MASTER_KEY || '4M07vmyAi1RHLjMmo7oXJYDN';

AV.initialize(APP_ID, APP_KEY, MASTER_KEY);
// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();

const app = new Koa();
const router = new Router();
// const D = debug('charles:server');

// middlewares
app.use(convert(bodyparser()));
app.use(convert(json()));
app.use(convert(logger()));
app.use(convert(serve(path.join(__dirname, 'public'))));
app.use(views(path.join(__dirname, 'views'), {
  extension: 'swig'
}));

app.use(cros);

// 健康监测 router
router.all('/__engine/1/ping', ctx => {
  ctx.body = {
    runtime: 'nodejs-' + process.version,
    version: 'custom'
  }
});
router.use('/', index.routes());
router.use('/api', api.routes());

app.use(router.routes());

// 错误处理
onerror(app);

// 端口一定要从环境变量 `LC_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
const PORT = parseInt(process.env.LC_APP_PORT || 3000);
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

export default app;
