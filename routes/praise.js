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
    praise.radix = radix;
    updateParise();
    await ctx.render('praise', {
        radix: praise.radix,
        real: praise.real
    });
}).get('/set', async (ctx, next) => {
    await ctx.render('praise', {
        radix: praise.radix,
        real: praise.real
    });
});

export default router;
