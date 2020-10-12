const users = require('./users')
const friends = require('./friends')

module.exports = (Schema, db) => {
    return {
        Users: db.model('users', new Schema(users)),
        Friends: db.model('friends', new Schema(friends)),
    }
};