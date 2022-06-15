const { Router } = require('express');
const { body } = require('express-validator');
const tokensController = require('./tokens.controller');

const tokensRouter = new Router();

//api/tokens
tokensRouter.post('/email-verify', body('emailToken').isJWT().trim(), tokensController.confirmEmail);

module.exports = tokensRouter;