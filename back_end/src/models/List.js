const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema ({
    id: String,
    listName: {
        type: String,
        length: 50,
        require: true
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('List', listSchema);