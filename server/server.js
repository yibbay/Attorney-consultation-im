const Koa = require('koa')
const { join } = require('path')
const koaBody = require('koa-body')
const views = require('koa-views')
const sta = require('koa-static')
const path = require('path')
// var cors = require("cors");
const router = require('./router/index')   //导入路由模块，下面会有详细代码
const routerResponse = require('./middleware/routerResponse')
// const cors = require('koa-cors')
const app = new Koa

app

    .use(sta('./pdf_down'))
    
    .use(routerResponse())
    .use(koaBody()) //处理post请求
    .use(router.routes()) //1
    .use(router.allowedMethods()) //2
    //步骤1，2将路由绑定到Koa的实例app身上
    .listen(8000, err => {
        !err && console.log('服务启动成功，端口监听在8000')
    })
