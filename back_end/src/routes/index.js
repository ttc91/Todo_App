const accountRouter = require('./account.route');
require('dotenv').config(); 

const api = process.env.API_URL;

function routes(app){

    app.use(api + '/account', accountRouter);

}

module.exports = {routes};