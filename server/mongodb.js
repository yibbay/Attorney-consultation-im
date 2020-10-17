const mongoose = require('mongoose')
const schemasConstruction = require('./schema/index')
console.log('schemasConstruction')
console.log(schemasConstruction)
//新版mongoose推荐使用createConnection连接数据库，不要使用connect
const db = mongoose.createConnection('mongodb://129.211.91.209:27017/test', {
　//添加这两个参数为了避免警告
    useNewUrlParser:true,
    useUnifiedTopology: true
})

//用es6的Promise覆盖mongoose自实现的Promise，我们用es6的Promise就好了
mongoose.Promise = global.Promise
db.on('error',(err)=>{console.log(err)})
db.on('open',()=>{console.log('mongodb连接成功')})
const Schema = mongoose.Schema     //得到Schema构造函数


//建立集合，规定使用定义好的Shcema标准插入数据，返回一个构造函数
//将Users暴露出去，可以用于操作数据
exports.schema = schemasConstruction(Schema, db);
exports.Schema = Schema
