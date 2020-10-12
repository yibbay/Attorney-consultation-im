const Router = require('koa-router')
const { Users } = require('./mongodb')
const router = new Router

说明：我们通过localhost:8000访问本地服务，默认返回的是根路由，这时可以渲染index页面，如果前面没有配置视图模板，那么将不存在ctx.render方法。koa2建议中间件最好使用异步回调，中间件就是跟在路由后面的异步函数，一条路由可以有一个或者多个中间件，通过next方法决定执不执行下一个中间件

router.get('/', async ctx => {
    await ctx.render('index')
})

//增
router.post('/addtion',async ctx => {
    const { name, age, sex } = ctx.request.body
    const user = new Users({
        name,
        age,
        sex
    })
    //save方法是异步的，必须等待它执行完成后才能ctx.body，否则，ctx.body是无法返回到页面的
    const isSuccess = await user.save()
        .then( () => {
            console.log('保存成功')
            return true
        })
        .catch( err => {
            console.log(err)
            return false
        })
    ctx.body = isSuccess ? '添加成功' : '添加失败'
})

//删
router.get('/deletion',async ctx => {
    const isSuccess = await Users.deleteMany(ctx.query).then( res => {
        return res
    }).catch( () => {
        return false
    })
    ctx.body = isSuccess ? `成功删除了${isSuccess.n}条数据` : '删除失败'
})

//改
router.get('/modification',async ctx => {
    const result = await Users.updateMany(
        ctx.query,
        {$set:{'name':'MongoDB'}
    }).then( res => {
        return res
    }).catch( () => {
        return false
    })
    ctx.body = result ? '修改成功' : '修改失败'
})

//查
router.get('/locating',async ctx => {
    const result = await Users.find(ctx.query).then( res => {
        return res
    }).catch( (err) => {
        return err
    })
    ctx.body = result
})

module.exports = router
