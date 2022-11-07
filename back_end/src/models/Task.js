const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema ({
    taskName: {
        type: String,
        length: 50,
        require: true
    },
    note: {
        type: String,
        length: 500,
        default: null
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    isImportant: {
        type: Boolean,
        default: false
    },
    isToday: {
        type: Boolean,
        default: false
    },
    deadline: {
        type: Date,
        default: null
    },
    remindAt: {
        type: Date,
        default: null
    },
    file: {
        type: Buffer,
        default: null
    },
    list: {
        type: Schema.Types.ObjectId,
        ref: 'List'
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

module.exports = mongoose.model('Task', taskSchema);