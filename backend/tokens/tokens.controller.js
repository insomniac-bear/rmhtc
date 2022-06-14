const { StatusCodes } = require('http-status-codes');
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

module.exports = new TokensController();