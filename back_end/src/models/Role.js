const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = Schema ({
    id: String,
    roleName : {
        type: String,
        length: 10,
        require: true,
        unique: true
    }
})

module.exports = mongoose.model('Role', roleSchema);