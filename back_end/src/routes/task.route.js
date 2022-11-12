const express = require('express');
const router = express.Router();
const service = require('../services/TaskService');
const multer = require('multer')

var upload = multer()

router.post('/create', service.create);
router.put('/update', service.update);
router.post('/import',service.import);
router.get('/:id', service.getOne);
router.get('/get_all/:listId', service.getAll);
router.delete('/:id', service.delete);

module.exports = router;