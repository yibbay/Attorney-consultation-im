const { Schema } = require('../mongodb')

exports.default =
{   //用Schema定义插入数据的类型
    userId: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
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
    createAt: {type: Date, default: Date.now},
    updateAt: {type: Date, default: Date.now},
    //用户类型
    userType: String
}, {
    versionKey: false, timestamps: {
        createdAt: "created"
    }
}