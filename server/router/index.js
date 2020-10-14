const Router = require('koa-router');
const user = require('./user');
const router = new Router({ prefix: '/api' })
router.get(`/search`, async ctx => {
    
    ctx.body = 'hellow world'
})

let routerMap = {
    user
}

for (let key in routerMap) {
    routerMap[key](router)
}

module.exports = router
