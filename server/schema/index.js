const users = require('./users')
const friends = require('./friends')

exports.default = (Schema, db) => {
    return {
        Users: db.model('users', new Schema(users)),
        Friends: db.model('friends', new Schema(friends)),
    }
};