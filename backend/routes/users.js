const { Router } = require('express');
const { StatusCodes } = require('http-status-codes');
const { body, validationResult } = require('express-validator');
const multer = require('multer')
const CustomError = require('../lib/custom-error');
const errorResponse = require('../lib/error-response');
const checkAuth = require('../middlewares/auth-middleware');
const { putObject } = require('../lib/save-file');
const { getExt } = require('../lib/get-ext');

const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

module.exports = (app, userController) => {
  const usersRouter = new Router();
  app.use('/users', usersRouter);

  /**
   *
   * Open user's routes
   *
  */

  // POST /api/v1/users/registration
  usersRouter.post('/registration', body('email').isEmail().normalizeEmail(), async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new CustomError('failed', StatusCodes.BAD_REQUEST, 'You must send valid email');
      }

      const { email, userType } = req.body;
      await userController.registration(email, userType);

      return res
        .status(StatusCodes.CREATED)
        .json({
          service_data: {
            status: 'success',
            message: 'redirect',
          },
          client_data: {}
        });
    } catch (err) {
      if (err instanceof CustomError) {
        return res
          .status(err.status)
          .json({
            service_data: {
              status: err.code,
              message: err.message,
            },
            client_data: {}
          });
      } else {
        next(err);
      }
    }
  });
  // POST /api/v1/users/confirm-email
  usersRouter.post('/confirm-email', async (req, res, next) => {
    try {
      const emailToken = req.body.email_token;

      const user = await userController.emailVerification(emailToken);
      return res
      .status(StatusCodes.OK)
      .json({
        service_data: {
          status: 'success',
          message: 'redirect',
        },
        client_data: {
          user
        }
      });
  } catch (err) {
      if (err instanceof CustomError) {
        return res
          .status(err.status)
          .json({
            service_data: {
              status: err.code,
              message: err.message,
            },
            client_data: {}
          });
      } else {
        next(err);
      }
    }
  });
  // POST /api/v1/users/set-password
  usersRouter.post('/set-password', body('password').isLength({ min: 8 }).trim(), async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new CustomError('failed', StatusCodes.BAD_REQUEST, `Password must having min 8 symbols`);
      }

      const { uuid, password } = req.body;
      const regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])$/;
      if (regexp.test(password)) {
        throw new CustomError('failed', StatusCodes.BAD_REQUEST, 'Password must having min 8 symbols and contains sumbols a-z, A-Z and 0-9');
      }
      await userController.setPassword(uuid, password);
      return res
      .status(StatusCodes.OK)
      .json({
        service_data: {
          status: 'success',
          message: 'redirect',
        },
        client_data: {}
      });

    } catch (err) {
      if (err instanceof CustomError) {
        return res
          .status(err.status)
          .json({
            service_data: {
              status: err.code,
              message: err.message,
            },
            client_data: {}
          });
      } else {
        next(err);
      }
    }
  });
  // POST /api/v1/users/authorization
  usersRouter.post('/authorization', [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).trim()
  ], async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new CustomError('failed', StatusCodes.FORBIDDEN, 'Authorization data isn\'t valid');
      }

      const {email, password} = req.body;
      const {refreshToken, accessToken, updatedUser} = await userController.authorization(email, password);
      delete updatedUser.password;

      res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: 'lax',
      });
      return res
        .status(StatusCodes.OK)
        .json({
          service_data: {
            status: 'success',
            message: 'redirect',
          },
          client_data: {
            accessToken: accessToken,
            user: updatedUser,
          }
        });

    } catch (err) {
      if (err instanceof CustomError) {
        return res
          .status(err.status)
          .json({
            service_data: {
              status: err.code,
              message: err.message,
            },
            client_data: {}
          });
      } else {
        next(err);
      }
    }
  });
  // GET /api/v1/users/authention
  usersRouter.get('/authentication', async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      const { newAccessToken, newRefreshToken, user } = await userController.authenticated(refreshToken);
      res.cookie('refreshToken', newRefreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: 'lax',
      });
      return res
        .status(StatusCodes.OK)
        .json({
          service_data: {
            status: 'success',
            message: 'redirect',
          },
          client_data: {
            accessToken: newAccessToken,
            user,
          }
        });
    } catch (err) {
      return errorResponse(err, res, next);
    }
  });

  /**
   *
   * Protected user's routes
   *
  */
  // GET /api/v1/users/logout
  usersRouter.get('/logout', [
    checkAuth
  ], async (req, res, next) => {
    try {
      const userUUID = req.userUUID;
      await userController.logout(userUUID);
      res.clearCookie('refreshToken');
      res
        .status(StatusCodes.OK)
        .json({
          service_data: {
            status: 'success',
            message: 'redirect',
          },
          cliend_data: {}
        },)
    } catch (err) {
      return errorResponse(err, res, next);
    }
  });
  // PATCH /api/v1/users/personal-data
  usersRouter.patch('/personal-data', [
    checkAuth
  ], async (req, res, next) => {
    try {
      const { name, surname, patronymic, phone, birthday, gender,avatarLink } = req.body;
      const userUUID = req.userUUID;
      const accessToken = req.newAccessToken;
      const refreshToken = req.newRefreshToken;
      const updatedUser = await userController.updateUsersPersonalData({ name, surname, patronymic, phone, birthday, gender,avatarLink }, userUUID);

      res.cookie('refreshToken', refreshToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
      return res
        .status(StatusCodes.OK)
        .json({
          service_data: {
            status: 'success',
            message: 'redirect',
          },
          client_data: {
            accessToken: accessToken,
            user: updatedUser,
          }
        });
    } catch(err) {
      return errorResponse(err, res, next);
    }
  });
  // POST /api/v1/users/avatar
  usersRouter.post('/avatar', [
    checkAuth,
    upload.single('avatar')
  ], (req, res, next) => {
    try {
      const userUUID = req.userUUID;

      if (req.file.size > 3145728) {
        throw new CustomError('error', StatusCodes.BAD_REQUEST, 'File larger than 3 Mb')
      }

      const originalExt = getExt(req.file.originalname);

      if (originalExt !== 'jpg' && originalExt !== 'png' && originalExt !== 'svg') {
        throw new CustomError('error', StatusCodes.BAD_REQUEST, 'Incorrect file format');
      }

      const avatarUrl = putObject(`avatars/${userUUID}/avatar.${originalExt}`, req.file.buffer);
      res
        .status(StatusCodes.OK)
        .json({
          service_data: {
            status: 'success',
            message: 'file was save',
          },
          client_data: {
            url: avatarUrl,
          }
        })
    } catch (err) {
      next(err)
    }
  });
}
