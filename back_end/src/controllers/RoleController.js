const service = require('../services/RoleService');

class RoleController {

    create(req, res) {
        service.create(req, res);
    }

}

module.exports = new RoleController;

