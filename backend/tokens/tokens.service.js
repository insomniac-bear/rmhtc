const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../lib/custom-error');
const {
  RefreshTokens,
  EmailTokens,
} = require('../models');
const {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} = require('../const');

/**
 * Generate access token
 * @param {Object of string} uuid and email
 * @returns { String } access token
 */
function generateAccessToken({ uuid, email }) {
  return jwt.sign({ uuid, email }, JWT_ACCESS_SECRET, { expiresIn: '59s' });
}

/**
 * Validate access token
 * @param { String } token
 * @returns { Object } uuid and email
 */
function validateAccessToken(token) {
  try {
    const {uuid, email} = jwt.verify(token, JWT_ACCESS_SECRET);
    return { uuid, email }
  } catch(err) {
    return undefined;
  }
}

  function generateRefreshToken({ uuid, email }) {
    return jwt.sign({ uuid, email }, JWT_REFRESH_SECRET, { expiresIn: '8h' });
  }

  function validateRefreshToken(token) {
    try {
      const {uuid, email} = jwt.verify(token, JWT_REFRESH_SECRET);
      return {uuid, email};
    } catch (err) {
      return undefined;
    }
  }

  async function saveRefreshToken(userUuid, refreshToken) {
    try {
      const oldToken = await this.findRefreshToken(userUuid);
      if (!oldToken) {
        await RefreshTokens.create({
          refreshToken,
          userUuid,
        });
      }

      const newToken = await RefreshTokens.update({
        refreshToken,
      },
      {
        where: {
          userUuid
        }
      });
      return newToken;
    } catch (err) {
      throw new CustomError('error', StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async function dropRefreshToken(tokenUuid) {
    return await RefreshTokens.destroy({
      where: {
        uuid: tokenUuid,
      }
    });
  }

  async function findRefreshToken(userUuid) {
    try {
      const refreshToken = await RefreshTokens.findOne({
        where: {
          userUuid,
        }
      });
      return refreshToken;
    } catch(err) {
      throw new CustomError('failed', StatusCodes.FORBIDDEN, 'Authorization data isn\'t valid');
    }
  }

  function generateEmailVerificationToken({ uuid, email }) {
    return jwt.sign({ uuid, email }, JWT_ACCESS_SECRET);
  }

  function validateEmailVerifiedToken(jwtLink) {
    try {
      return jwt.verify(jwtLink, JWT_ACCESS_SECRET);
    } catch (err) {
      throw new CustomError('failed', StatusCodes.FORBIDDEN, 'Access Denied. Token isn\'t valid');
    }
  }

  async function saveEmailVerificationToken(token, userUuid) {
    const emailToken = EmailTokens.build({
      emailToken: token,
      userUuid
    });
    await emailToken.save();
    return emailToken;
  }

async function getEmailVerificationToken(emailToken) {
  const token = await EmailTokens.findOne({
    where: {
      emailToken,
    }
  });
  return token;
}

  async function dropEmailVerificationToken({tokenUuid}) {
    return await EmailTokens.destroy({
      where: {
        uuid: tokenUuid,
      }
    })
  }

module.exports = {
  generateAccessToken,
  validateAccessToken,
  generateRefreshToken,
  validateRefreshToken,
  saveRefreshToken,
  dropRefreshToken,
  findRefreshToken,
  generateEmailVerificationToken,
  validateEmailVerifiedToken,
  saveEmailVerificationToken,
  getEmailVerificationToken,
  dropEmailVerificationToken
};