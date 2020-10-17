const Koa = require('koa')
const { join } = require('path')
const koaBody = require('koa-body')
const views = require('koa-views')
const router = require('./router/index')   //导入路由模块，下面会有详细代码
const routerResponse = require('./middleware/routerResponse')
// const cors = require('koa-cors')
const app = new Koa

app
    .use(views(join(__dirname, "views"), {
        //配置视图模板，html文件存放到文件夹views里面
        //node的一个特点就是服务端渲染，这里可以直接配置为html页面，也可配置为pug等模板文件
        extension: "html"
    }))
    // .use(cors())
    .use(routerResponse())
    .use(koaBody()) //处理post请求
    .use(router.routes()) //1
    .use(router.allowedMethods()) //2
    //步骤1，2将路由绑定到Koa的实例app身上
    .listen(8000, err => {
        !err && console.log('服务启动成功，端口监听在8000')
    })
