const { Router } = require('express');
const authController = require('./auth.controller');

const authRouter = new Router();

// api/v1

authRouter.post('/registration', authController.registrationUser);

module.exports = authRouter;
