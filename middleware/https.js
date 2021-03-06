var endsWith = (str, suffix) => {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
};

export default (AV) => {
    return (ctx, next) => {
        if ((AV.Cloud.__prod || endsWith(ctx.get('host'), '.leanapp.cn')) && (!ctx.secure)) {
            return ctx.redirect('https://' + ctx.get('host') + ctx.originalUrl);
        } else {
            return next();
        }
    };
}