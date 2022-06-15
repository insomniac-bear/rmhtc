const { StatusCodes } = require('http-status-codes');
const { validationResult } = require('express-validator');
const CustomError = require('../lib/custom-error');
const { registrationUser } = require('./auth.service');

class AuthController {
  constructor() {
  }

  async registrationUser (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new CustomError('failed', StatusCodes.BAD_REQUEST, 'You must send valid email');
      }

      const { email } = req. body;
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
}

module.exports = new AuthController();
