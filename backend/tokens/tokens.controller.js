const { StatusCodes } = require('http-status-codes');
const { validationResult } = require('express-validator');
const CustomError = require('../lib/custom-error');
const {
  validateEmailVerifiedToken,
  getEmailVerificationToken
} = require('./tokens.service');
const {
  getUserById,
  updateUser
} = require('../users/users.service');

class TokensController {
  constructor() {}

  async confirmEmail (req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new CustomError('failed', StatusCodes.BAD_REQUEST, 'Invalid token value');
      }

      const emailToken = req.body.emailToken;
      if (!emailToken) {
        throw new CustomError('failed', StatusCodes.BAD_REQUEST, 'verification token isn\'t exist');
      }

      const { uuid, email } = validateEmailVerifiedToken(emailToken);
      const user = await getUserById(uuid);
      if (!user || user.email !== email) {
        throw new CustomError('failed', StatusCodes.UNAUTHORIZED, 'bad token');
      }

      const savedToken = await getEmailVerificationToken(emailToken);
      if (!savedToken) {
        throw new CustomError('failed', StatusCodes.BAD_REQUEST, 'token not found');
      }

      const updatedUser = await updateUser(uuid, {
        emailVerified: true
      });

      return res
        .status(StatusCodes.OK)
        .json({
          status: 'success',
          data: updatedUser,
        })
    } catch (err) {
      errorResponse(err, res, next);
    }
  }
}

module.exports = new TokensController();