const res = require('express/lib/response');
const mongoose = require('mongoose');
require('dotenv').config(); 

async function connect () {
    await mongoose.connect(process.env.CONNECT_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'todo_app'
    })
    .then(() => {
        console.log('Connect to db completed !');
    }).catch((error) => {
        console.log('Connect to db fail !');
    }); 
};

module.exports = {connect}; 

