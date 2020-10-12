const users = require('./users')
const friends = require('./friends')

exports.default = (Schema, db) => {
    db.counters.insert({userId:"userId", sequence_value:0});
    return {
        Users: db.model('users', new Schema(users)),
        Friends: db.model('friends', new Schema(friends)),
    }
};