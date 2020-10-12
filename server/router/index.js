const Router = require('koa-router');
const user = require('./user');
const router = new Router({ prefix: '/api' })

let routerMap = {
    user
}

for (let key in routerMap) {
    routerMap[key](router)
}

module.exports = router
