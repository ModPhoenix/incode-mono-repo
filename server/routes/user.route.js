const express = require('express');
const router = express.Router();

const { getAll, getById, create, update, deleteUser } = require('../controllers/user.controller');


router.get('/', getAll);
router.post('/', create);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', deleteUser);
module.exports = router;
