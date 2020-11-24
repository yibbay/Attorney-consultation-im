// const { Schema } = require('../mongodb')

module.exports =
{   //用Schema定义插入数据的类型
    phone: {
        type: String,
        index: true,
        unique: true
    },
    name: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    age: Number,
    sex: {
        type: Number,
        default: 1
    },
    intro: {
        type: String,
    },
    //用户类型
    userType: String
}, {
    versionKey: false, timestamps: {
        createdAt: "createAt",
        updatedAt: "updatedAt"
    }
}