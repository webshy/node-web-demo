const { Mongoose } = require("mongoose")

module.exports = app => {
  const mongoose = require("mongoose")
   mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba',{
     useNewUrlParser:true,
     useUnifiedTopology: true 
   }).then(res => {
     console.log('数据库连接成功')
   })
}