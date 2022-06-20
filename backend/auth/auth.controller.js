const { StatusCodes } = require('http-status-codes');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const CustomError = require('../lib/custom-error');
const { registrationUser } = require('./auth.service');
const errorResponse = require('../lib/error-response');
const {
  generateAccessToken,
  generateRefreshToken,
  saveRefreshToken
} = require('../tokens/tokens.service');
const {
  updateUser,
  getUserById,
} = require('../users/users.service');
const { createRole } = require('../roles/roles.service');
const { createCompany } = require('../companies/companies.service');
const { SALT } = require('../const');

class AuthController {
  constructor() {
  }

  async registrationUser (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new CustomError('failed', StatusCodes.BAD_REQUEST, 'You must send valid email');
      }

      const { email } = req.body;
      const registrationSuccess = await registrationUser(email);

      return res
        .status(StatusCodes.OK)
        .json({
          status: 'success',
          data: registrationSuccess
        })
    } catch (err) {
      errorResponse(err, res, next);
    }
  }

  async finishRegistration (req, res, next) {
    try {
      const salt = await bcrypt.genSalt(SALT);

      const { userData, companyData } = req.body;
      const { uuid, password, businessRole } = userData;

      const regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])$/;
      if (regexp.test(password)) {
        throw new CustomError('failed', StatusCodes.BAD_REQUEST, 'Password must having min 8 symbols and contains sumbols a-z, A-Z and 0-9');
      }

      const { uuid: userRoleUuid } = await createRole('BASE USER', ['All']);
      const hashedPassword = await bcrypt.hash(password, salt);
      await updateUser(uuid, {
        password: hashedPassword,
        businessRole,
        roleUuid: userRoleUuid,
      });
      const user = await getUserById(uuid);
      if (!user) {
        throw new CustomError('error', StatusCodes.BAD_GATEWAY, 'Error with updating user');
      }
      const { email } = user;
      const accessToken = generateAccessToken({ uuid, email });
      const refreshToken = generateRefreshToken({ uuid, email });
      await saveRefreshToken(uuid, refreshToken);

      await createCompany({
        name: companyData.name,
        userUuid: user.uuid,
      });

      res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: 'lax',
      });
      return res
      .status(StatusCodes.OK)
      .json({
        status: 'success',
        accessToken,
        user,
      });
    } catch (err) {
      errorResponse(err, res, next);
    }
  }
}

module.exports = new AuthController();
