exports.default =
{   //用Schema定义插入数据的类型
    userId: {
        required: true
    },
    friendId: {
        required: true
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