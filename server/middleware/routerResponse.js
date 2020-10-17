function routerResponse(option = {}) {
    return async function  (ctx, next) {
        ctx.success = function (data) {
            ctx.type = option.type || 'json'
            ctx.body = {
                code: option.successCode || 200,
                msg: option.successMsg || 'success',
                data: data,
                time: new Date().getTime(),
                success: true
            }
        }

        ctx.fail = function (msg, code) {
            ctx.type = option.type || 'json'
            ctx.body = {
                code: code || option.failCode || 99,
                msg: msg || option.successMsg || '网络异常',
                time: new Date().getTime(),
                success: false
            }
        }

        await next()
    }

}


module.exports = routerResponse