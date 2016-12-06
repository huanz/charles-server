import fs from 'fs';
import path from 'path';
import Router from 'koa-router';

const router = new Router();
var praise = require('../data/praise');

function updateParise() {
    fs.writeFile(path.join(__dirname, '../data/praise.json'), JSON.stringify(praise), function (err) {
        if (err) {
            console.log(err);
        }
    });
}

router.get('/', async (ctx, next) => {
    ctx.body = {
        no: 0,
        msg: 'success',
        num: praise.radix + praise.real
    };
}).post('/', async (ctx, next) => {
    praise.real = praise.real + 1;
    updateParise();
    ctx.body = {
        no: 0,
        msg: 'success'
    };
}).post('/set', async (ctx, next) => {
    let radix = +ctx.request.body.radix;
    let orderRadix = +ctx.request.body.orderRadix;
    praise.radix = radix;
    praise.orderRadix = orderRadix;
    updateParise();
    await ctx.render('praise', {
        radix: praise.radix,
        real: praise.real,
        order: praise.order,
        orderRadix: praise.orderRadix
    });
}).get('/set', async (ctx, next) => {
    await ctx.render('praise', {
        radix: praise.radix,
        real: praise.real,
        order: praise.order,
        orderRadix: praise.orderRadix
    });
}).get('/order', async (ctx, next) => {
    ctx.body = {
        no: 0,
        msg: 'success',
        num: praise.order + praise.orderRadix
    };
}).post('/order', async (ctx, next) => {
    praise.order = praise.order + 1;
    updateParise();
    ctx.body = {
        no: 0,
        msg: 'success',
        num: praise.order
    };
});

export default router;
