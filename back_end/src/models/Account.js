const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema ({
    _id: Schema.Types.ObjectId,
    username: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    roles: [{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }],
})

module.exports = mongoose.model('Account', accountSchema);