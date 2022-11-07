const service = require('../services/AccountService');

class AccountController {

    create(req, res){
        service.create(req, res);
    }

}

module.exports = new AccountController;