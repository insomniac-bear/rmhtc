const { Router } = require('express');
const usersController = require('./users.controller');
const authMiddleware = require('../middlewares/auth-middleware');

const usersRouter = new Router();

// api/v1/users - route
usersRouter.get('/', usersController.getAllUsers);
usersRouter.post('/', usersController.createUser);
usersRouter.patch('/', authMiddleware, usersController.updateUser);


module.exports = usersRouter;
