var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://129.211.91.209:27017/runoob";
 
MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  console.log("数据库已创建!");
  db.close();
});
