const { Router } = require('express');
const usersController = require('./users.controller');

const usersRouter = new Router();

// api/users - route
usersRouter.get('/', usersController.getAllUsers);
usersRouter.post('/', usersController.createUser);


module.exports = usersRouter;
