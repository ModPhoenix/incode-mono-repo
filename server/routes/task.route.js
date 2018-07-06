const express = require('express');
const router = express.Router();

const VerifyToken = require('../middleware/VerifyToken');
const CheckPermissions = require('../middleware/CheckPermissions');

const { getAll, getById, create, update, deleteTask } = require('../controllers/task.controller');

router.get('/', VerifyToken, getAll);
router.post('/', VerifyToken, CheckPermissions, create);
router.get('/:id', VerifyToken, getById);
router.put('/:id', VerifyToken, update);
router.delete('/:id', VerifyToken, CheckPermissions, deleteTask);
module.exports = router;
