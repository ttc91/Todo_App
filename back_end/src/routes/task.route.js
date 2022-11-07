const express = require('express');
const router = express.Router();
const service = require('../services/TaskService');

router.post('/create', service.create);
router.put('/update', service.update);
router.get('/:id', service.getOne);
router.get('/get_all/:listId', service.getAll);
router.delete('/:id', service.delete);

module.exports = router;