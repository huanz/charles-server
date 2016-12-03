import fs from 'fs';
import Router from 'koa-router';

const router = new Router();
var praise = require('../data/praise');

function updateParise() {
    fs.writeFileSync('../data/praise.json', JSON.stringify(praise));
}

router.get('/', async (ctx, next) => {
    ctx.body = {
        no: 0,
        msg: 'success',
        num: praise.radix + praise.real
    };
}).post('/', async (ctx, next) => {
    praise.real = praise.real + 1;
    updateParise(praise);
    ctx.body = {
        no: 0,
        msg: 'success'
    };
}).post('/set', async (ctx, next) => {
    let radix = +ctx.request.body.radix;
    praise.radix = radix;
    updateParise(praise);
    ctx.body = {
        radix: radix,
        num: radix + praise.real,
        no: 0,
        msg: 'success'
    }
});

export default router;
