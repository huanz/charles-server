import Router from 'koa-router';
import AV from 'leanengine';
import Mock from 'mockjs';

const router = new Router();
const API = AV.Object.extend('API');

router.get('/:id', async (ctx, next) => {
  let query = new AV.Query(API);
  query.equalTo('objectId', ctx.params.id);
  try {
    let result = await query.first();
    let api = result.get('content');
    ctx.body = api.content;
  } catch (e) {
    ctx.body = {
      no: 1,
      msg: 'not found'
    }
  }
}).post('/', async (ctx, next) => {
  let content = ctx.request.body;
  let api = new API();
  api.set('content', Mock.mock(JSON.parse(content)));
  api.set('tpl', content);
  try {
    let result = await api.save();
    ctx.body = {
      id: result.id,
      no: 0,
      msg: 'success'
    }
  } catch (e) {
    ctx.body = {
      no: 1,
      msg: 'save error'
    }
  }
}).put('/:id', async (ctx, next) => {
  let content = ctx.request.body.content;
  let api = AV.Object.createWithoutData('API', ctx.params.id);
  api.set('content', Mock(content));
  api.set('tpl', content);
  try {
    let result = await api.save();
    ctx.body = {
      no: 0,
      msg: 'success'
    }
  } catch (e) {
    ctx.body = {
      no: 1,
      msg: 'update error'
    }
  }
}).delete('/:id', async (ctx, next) => {
  let api = await AV.Object.createWithoutData('API', ctx.params.id);
  try {
    api.destroy();
    ctx.body = {
      no: 0,
      msg: 'success'
    }
  } catch (e) {
    ctx.body = {
      no: 1,
      msg: 'delete error'
    }
  }
});

export default router;
