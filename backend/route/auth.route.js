const express = require('express');
const router = express.Router();
const authController = require('./../controller/auth.controller.js');
// const {limiter} = require('./../middleware/limiter.middleware.js');

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/register', authController.register);
router.get('/me', authController.getMe);

module.exports = router;