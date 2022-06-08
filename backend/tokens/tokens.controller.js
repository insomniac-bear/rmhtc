const { StatusCodes } = require('http-status-codes');
const CustomError = require('../lib/custom-error');
const { validateEmailVerifiedToken } = require('./tokens.service');
const { getUserById } = require('../users/users.service');

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

      return res
        .status(StatusCodes.OK)
        .json({
          status: 'success',
          data: null,
        })
    } catch (err) {}
  }
}

module.exports = new TokensController();