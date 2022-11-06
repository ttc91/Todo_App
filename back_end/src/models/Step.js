const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stepSchema = Schema ({
    _id: Schema.Types.ObjectId,
    stepName : {
        type: String,
        length: 10,
        require: true
    },
    isCompleted: Boolean,
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }
})

module.exports = mongoose.model('Step', stepSchema);