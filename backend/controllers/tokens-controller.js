const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const models = require('../models');
const CustomError = require('../lib/custom-error');
const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} = require('../const');

class TokenController {
  #RefreshToken
  constructor() {
    this.#RefreshToken = models.RefreshToken;
  }

  generateAccessToken({ uuid, email }) {
    return jwt.sign({ uuid, email }, JWT_ACCESS_SECRET, { expiresIn: '59s' });
  }

  generateRefreshToken({ uuid, email }) {
    return jwt.sign({ uuid, email }, JWT_REFRESH_SECRET, { expiresIn: '24h' });
  }

  generateJwtLink({ userId, email, userType }) {
    return jwt.sign({
      userId,
      email,
      userType,
    }, JWT_ACCESS_SECRET);
  }

  validateAccessToken(token) {
    try {
      const {uuid, email} = jwt.verify(token, JWT_ACCESS_SECRET);
      return { uuid, email }
    } catch(err) {
      return undefined;
    }
  }

  validateRefreshToken(token) {
    try {
      const {uuid, email} = jwt.verify(token, JWT_REFRESH_SECRET);
      return {uuid, email};
    } catch (err) {
      return undefined;
    }
  }

  validateJwtLink(jwtLink) {
    try {
      return jwt.verify(jwtLink, JWT_ACCESS_SECRET);
    } catch (err) {
      throw new CustomError('failed', StatusCodes.FORBIDDEN, 'Access Denied. Token isn\'t valid');
    }
  }

  async saveRefreshToken(userUUID, refreshToken) {
    try {
      const oldToken = await this.#RefreshToken.findOne({
        where: { UserUUID: userUUID }
      });
      if (!oldToken) {
        await this.#RefreshToken.create({
          refreshToken,
          UserUUID: userUUID,
        });
      }

      const newToken = await this.#RefreshToken.update({
        refreshToken,
      },
      {
        where: {
          UserUUID: userUUID
        }
      });
      return newToken;
    } catch (err) {
      throw new CustomError('error', StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async removeRefreshToken(tokenUUID) {
    return await this.#RefreshToken.destroy({
      where: {
        UUID: tokenUUID,
      }
    });
  }

  async findRefreshToken(userUUID) {
    try {
      const refreshToken = await this.#RefreshToken.findOne({
        where: {
          UserUUID: userUUID,
        }
      });
      return refreshToken;
    } catch(err) {
      throw new CustomError('failed', StatusCodes.FORBIDDEN, 'Authorization data isn\'t valid');
    }
  }
};

module.exports = new TokenController;