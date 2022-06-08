const { StatusCodes } = require('http-status-codes');
const tokensController = require('../controllers/tokens-controller');
const CustomError = require('../lib/custom-error');

module.exports = (req, _res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
      const accessToken = authorizationHeader;
      if (accessToken) {
        const accessTokenData = tokensController.validateAccessToken(accessToken);
        if (accessTokenData) {
          const { uuid, email } = accessTokenData;
          const newAccessToken = tokensController.generateAccessToken({ uuid, email });
          const newRefreshToken = tokensController.generateRefreshToken({ uuid, email });
          req.userUUID = uuid;
          req.newAccessToken = newAccessToken;
          req.newRefreshToken = newRefreshToken;
          return next();
        }
      }
    }
    const { refreshToken } = req.cookies;
    if (refreshToken) {
      const refreshTokenData = tokensController.validateRefreshToken(refreshToken);
      if (refreshTokenData) {
        const { uuid, email } = refreshTokenData;
        const newAccessToken = tokensController.generateAccessToken({ uuid, email });
        const newRefreshToken = tokensController.generateRefreshToken({ uuid, email });
        req.userUUID = uuid;
        req.newAccessToken = newAccessToken;
        req.newRefreshToken = newRefreshToken;
        return next();
      } else {
        throw new CustomError('failed', StatusCodes.FORBIDDEN, 'Access denied: RefreshToken');
      }
    } else {
      throw new CustomError('failed', StatusCodes.FORBIDDEN, 'Access denied');
    }

  } catch (err) {
    next(err);
  }
}