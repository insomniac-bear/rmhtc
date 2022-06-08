const { StatusCodes } = require('http-status-codes');
const CustomError = require('../lib/custom-error');
const { registrationUser } = require('./auth.service');

class AuthController {
  constructor() {
  }

  async registrationUser (req, res, next) {
    try {
      const { email } = req. body;
      const registrationSuccess = await registrationUser(email);

      return res
        .status(StatusCodes.OK)
        .json({
          status: 'success',
          data: registrationSuccess
        })
    } catch (err) {
      if (err instanceof CustomError) {
        return res
          .status(err.status)
          .json({
            status: 'failed',
            data: null,
          })
      } else {
        next (err);
      }
    }
  }
}

module.exports = new AuthController();
