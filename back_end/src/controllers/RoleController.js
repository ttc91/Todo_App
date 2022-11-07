const service = require('../services/RoleService');

class RoleController {

    create(req, res) {
        service.create(req, res);
    }

    update(req, res) {
        service.update(req, res);
    }

}

module.exports = new RoleController;

