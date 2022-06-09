const { Router } = require('express');
const { body } = require('express-validator');
const authController = require('./auth.controller');

const authRouter = new Router();

// api/v1

authRouter.post('/registration', body('email').isEmail().normalizeEmail(), authController.registrationUser);

module.exports = authRouter;
