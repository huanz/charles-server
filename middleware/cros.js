import config from '../config';

export default function (ctx, next) {
    let origin = ctx.get('origin');
    if (config.origin.indexOf(origin) !== -1) {
        ctx.set('Access-Control-Allow-Origin', origin);
        ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        ctx.set('Access-Control-Allow-Credentials', true);
        ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
    }
    return next();
}