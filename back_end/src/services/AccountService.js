const Account = require('../models/Account')

class AccountService {

    async create(req, res){

        var account = await Account ({
            email: req.body.email,
            password: req.body.password
        })

        await account.save().then(
            () => {
                res.status(201).json(account);
            }
        ).catch((err) => {
            res.status(500).json({
                error: err,
                success: false
            });
        })
    }

}

module.exports = new AccountService;