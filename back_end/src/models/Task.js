const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema ({
    id: String,
    taskName: {
        type: String,
        length: 50,
        require: true
    },
    note: {
        type: String,
        length: 500
    },
    isCompleted: Boolean,
    isImportant: Boolean,
    isToday: Boolean,
    deadline: Date,
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