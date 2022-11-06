const Role = require('../models/Role');

class RoleService {

    create(req, res) {

        const role = Role({
            roleName: req.body.roleName
        });
        role.save().then(
            () => {
                console.log('Create role complete !');
                res.send(role);
            }
        ).catch((err) => {
            console.log('Create role fail !');
        })

    };

    

}

module.exports = new RoleService;