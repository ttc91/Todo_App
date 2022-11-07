const Role = require('../models/Role');

class RoleService {

    async create(req, res) {

        const role = await Role({
            roleName: req.body.roleName
        });
        await role.save().then(
            () => {
                res.status(201).json(role);
            }
        ).catch((err) => {
            res.status(500).json({
                error: err,
                success: false
            })
        })

    };

    async update(req, res) {
        var role = await Role.findById(req.body.id);

        await role.updateOne({
            roleName: req.body.roleName
        })

        await role.save().then(
            () => {
                res.status(200).json(role);
            },
        ).catch((err) => {
            res.status(500).json({
                error: err,
                success: false
            })
        });
    }
    
}

module.exports = new RoleService;