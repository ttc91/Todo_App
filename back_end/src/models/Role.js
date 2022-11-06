const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = Schema ({
    roleName : {
        type: String,
        length: 10,
        require: true
    }
})

module.exports = mongoose.model('Role', roleSchema);