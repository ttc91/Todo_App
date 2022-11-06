const Account = require('../models/Account');

class AccountController {

    create(req, res){

        var account = Account ({
            username: req.body.username,
            password: req.body.password
        })

        account.save();

        res.send(account);
    }

}

module.exports = new AccountController;