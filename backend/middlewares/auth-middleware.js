const { StatusCodes } = require('http-status-codes');
const {
  generateAccessToken,
  generateRefreshToken,
  validateAccessToken,
  validateRefreshToken,
  dropRefreshTokenByParam,
} = require('../tokens/tokens.service');
const CustomError = require('../lib/custom-error');

module.exports = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const accessToken = authorizationHeader;
      if (accessToken) {
        const accessTokenData = validateAccessToken(accessToken);
        if (accessTokenData) {
          const { uuid, email } = accessTokenData;
          const newAccessToken = generateAccessToken({ uuid, email });
          const newRefreshToken = generateRefreshToken({ uuid, email });
          req.userUUID = uuid;
          req.newAccessToken = newAccessToken;
          req.newRefreshToken = newRefreshToken;
          return next();
        }
      }
    }
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      const refreshTokenData = validateRefreshToken(refreshToken);
      if (refreshTokenData) {
        const { uuid, email } = refreshTokenData;
        const newAccessToken = generateAccessToken({ uuid, email });
        const newRefreshToken = generateRefreshToken({ uuid, email });
        req.userUuid = uuid;
        req.newAccessToken = newAccessToken;
        req.newRefreshToken = newRefreshToken;
        return next();
      } else {
        await dropRefreshTokenByParam('userUuid', uuid);
        res.clearCookie('refreshToken');
        throw new CustomError('failed', StatusCodes.FORBIDDEN, 'Access denied: RefreshToken');
      }
    } else {
      res.clearCookie('refreshToken');
      throw new CustomError('failed', StatusCodes.FORBIDDEN, 'Access denied');
    }

  } catch (err) {
    next(err);
  }
}