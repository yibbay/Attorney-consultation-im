const { schema } = require('../mongodb')
const PREFIX = '/user'
const SCHEMA = 'Users'

module.exports = (router) => {
    //增
    router.post(`${PREFIX}/add`, async (ctx) => {
        const { userId, name, password, age, sex } = ctx.request.body
        const user = new schema[SCHEMA]({
            userId,
            name,
            password,
            age,
            sex
        })
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
        }).catch((err) => {
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
            }).catch((err) => {
                ctx.fail(err);
            })
    })

    //查
    router.post(`${PREFIX}/search`, async (ctx) => {
        let {pageNum, pageSize} = ctx.request.body
        console.log(ctx.request.body)
        await Promise.all([
            schema[SCHEMA].find(ctx.query).count(),
            schema[SCHEMA].find(ctx.query).limit(pageSize).skip((pageNum - 1) * pageSize)
        ]).then(datas => {
            let total = datas[0];
            let list = datas[1] || [];
            ctx.success({
                total,
                list
            });
        }).catch((err) => {
            ctx.fail(err);
        })
    })
};
