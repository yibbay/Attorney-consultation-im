const { schema } = require('../mongodb')
const PREFIX = '/user'
const SCHEMA = 'Users'

exports.default = (router) => {
    //增
    router.post(`${PREFIX}/add`, async ctx => {
        const { name, age, sex } = ctx.request.body
        const user = new schema[SCHEMA]({
            name,
            password,
            age,
            sex
        })
        //save方法是异步的，必须等待它执行完成后才能ctx.body，否则，ctx.body是无法返回到页面的
        const isSuccess = await user.save()
            .then(() => {
                console.log('保存成功')
                return true
            })
            .catch(err => {
                console.log(err)
                return false
            })
        ctx.body = isSuccess ? '添加成功' : '添加失败'
    })

    //删
    router.get(`${PREFIX}/delete`, async ctx => {
        const isSuccess = await schema[SCHEMA].deleteMany(ctx.query).then(res => {
            return res
        }).catch(() => {
            return false
        })
        ctx.body = isSuccess ? `成功删除了${isSuccess.n}条数据` : '删除失败'
    })

    //改
    router.get(`${PREFIX}/update`, async ctx => {
        const result = await schema[SCHEMA].updateMany(
            ctx.query,
            {
                $set: { 'name': 'MongoDB' }
            }).then(res => {
                return res
            }).catch(() => {
                return false
            })
        ctx.body = result ? '修改成功' : '修改失败'
    })

    //查
    router.get(`${PREFIX}/search`, async ctx => {
        const result = await schema[SCHEMA].find(ctx.query).then(res => {
            return res
        }).catch((err) => {
            return err
        })
        ctx.body = result
    })
};
