const { schema } = require('../mongodb')
const PREFIX = '/friends'
const SCHEMA = 'Friends'

module.exports = (router) => {
    //增
    router.post(`${PREFIX}/add`, async ctx => {
        const { name, age, sex } = ctx.request.body
        const user = new schema[SCHEMA]({
            userId,
            friendId,
            userGroup,
            friendGroup,
            userLabels,
            friendLabels
        })
        //save方法是异步的，必须等待它执行完成后才能ctx.body，否则，ctx.body是无法返回到页面的
        await user.save()
            .then(() => {
                ctx.success(true);
            })
            .catch(err => {
                ctx.fail(err);
            })
    })

    //删
    router.get(`${PREFIX}/delete`, async ctx => {
        await schema[SCHEMA].deleteMany(ctx.query).then(res => {
            ctx.success(res);
        }).catch(() => {
            ctx.fail(err);
        })
    })

    //改
    router.get(`${PREFIX}/update`, async ctx => {
        await schema[SCHEMA].updateMany(
            ctx.query,
            {
                $set: { 'name': 'MongoDB' }
            }).then(res => {
                ctx.success(res);
            }).catch(() => {
                ctx.fail(err);
            })
    })

    //查
    router.get(`${PREFIX}/search`, async ctx => {
        await schema[SCHEMA].find(ctx.query).then(res => {
            rctx.success(res);
        }).catch((err) => {
            ctx.fail(err);
        })
    })
};
