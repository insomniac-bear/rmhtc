const { Router } = require('express');
const multer = require('multer');
const usersController = require('./users.controller');
const authMiddleware = require('../middlewares/auth-middleware');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
})


const usersRouter = new Router();

// api/v1/users - route
usersRouter.get('/', usersController.getAllUsers);
usersRouter.post('/', usersController.createUser);
usersRouter.patch(
  '/',
  authMiddleware,
  usersController.updateUser
);
usersRouter.post(
  '/avatar',
  [
    authMiddleware,
    upload.single('avatar')
  ],
  usersController.uploadAvatar
);


module.exports = usersRouter;
