const express = require('express');
const router = express.Router();
require('dotenv').config(); 

const controller = require('../controllers/RoleController');

router.post('/create', controller.create);
router.put('/update', controller.update);

module.exports = router;