const express = require('express');
const router = express.Router();
require('dotenv').config(); 

const controller = require('../controllers/AccountController');

router.post('/create', controller.create);

module.exports = router;