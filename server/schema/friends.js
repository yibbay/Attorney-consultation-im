module.exports =
{   //用Schema定义插入数据的类型
    userId: {
        required: true,
        type: Number
    },
    friendId: {
        required: true,
        type: Number
    },
    userGroup: {
        type: String,
        default: ""
    },
    friendGroup: {
        type: String,
        default: ""
    },
    userLabels: {
        type: String,
        default: ""
    },
    friendLabels: {
        type: String,
        default: ""
    }
}, {
    versionKey: false, timestamps: {
        createdAt: "created"
    }
}