const accountRouter = require('./account.route');
const roleRouter = require('./role.route')
require('dotenv').config(); 

const api = process.env.API_URL;

function routes(app){

    app.use(api + '/account', accountRouter);
    app.use(api + '/role', roleRouter);

}

module.exports = {routes};