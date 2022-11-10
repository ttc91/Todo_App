const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate')

const stepSchema = Schema ({
    stepName : {
        type: String,
        length: 10,
        require: true
    },
    priority: Number,
    isCompleted: Boolean,
    task: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }
})


stepSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Step', stepSchema);