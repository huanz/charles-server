import fs from 'fs';
import path from 'path';
import Router from 'koa-router';

const router = new Router();
const praiseMap = ['', '魅族EP-31耳机', '魅族移动电源', '', '金刚熊猫钥匙扣', '', '魅族HD50耳机', ''];
var praise = require('../data/praise');
var prize = require('../data/prize');

function updateParise(fileName) {
    fileName = fileName || 'praise';
    var val = fileName === 'prize' ? prize : praise;
    fs.writeFile(path.join(__dirname, '../data/' + fileName + '.json'), JSON.stringify(val), function (err) {
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
}).get('/prize', async (ctx, next) => {
    await ctx.render('prize', {
        list: prize.list
    });
}).post('/prize', async (ctx, next) => {
    let phone = ctx.request.body.phone;
    let praise = praiseMap[ctx.request.body.praise];
    prize.list.push({
        phone: phone,
        praise: praise
    });
    updateParise('prize');
    ctx.body = {
        no: 0,
        msg: 'success'
    };
});

export default router;
