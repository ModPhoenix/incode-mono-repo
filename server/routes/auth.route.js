const express = require('express');
const router  = express.Router();

const VerifyToken = require('../middleware/VerifyToken');

const { login, register, me } = require('../controllers/auth.controller');

router.post('/login', login);
// router.get('/logout', logout);
router.post('/register', register);
router.get('/me', VerifyToken, me);
module.exports = router;
