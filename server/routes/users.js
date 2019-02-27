const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user');

router.post('/auth', UserController.auth);

router.post('/register', UserController.register);

router.get('/:id', UserController.authMiddleware, UserController.getUser);

module.exports = router; 
