const { Router } = require('express');
const tokensController = require('./tokens.controller');

const tokensRouter = new Router();

//api/tokens
tokensRouter.get('/email-verify', tokensController.confirmEmail);

module.exports = tokensRouter;