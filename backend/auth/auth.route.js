const { Router } = require('express');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const authController = require('./auth.controller');

const authRouter = new Router();

// api/v1
authRouter.post(
  '/registration',
  body('email')
    .isEmail()
    .normalizeEmail(),
  authController.registrationUser
);
authRouter.post('/finish-registration', authController.finishRegistration);
authRouter.post(
  '/login',
  body('email')
    .isEmail()
    .normalizeEmail(),
  authController.authUser
);
authRouter.get('/check-auth', authMiddleware, authController.checkAuth);
authRouter.get('/logout', authMiddleware, authController.logout);

module.exports = authRouter;
