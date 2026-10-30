const express = require('express');
const router = express.Router();
const authController = require('./../controller/auth.controller.js');
// const {limiter} = require('./../middleware/limiter.middleware.js');

// router.post('/login',limiter(15,5), authController.login);
router.post('/signin',authController.signin);

module.exports = router;