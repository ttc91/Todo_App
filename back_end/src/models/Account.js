const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema ({
    id: String,
    username: {
        type: String,
        unique: true,
        require: true,
        length: 50
    },
    password: {
        type: String,
        require: true
    },
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