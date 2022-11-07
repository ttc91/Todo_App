const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stepSchema = Schema ({
    id: String,
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