const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const tokensController = require('./tokens-controller');
const models = require('../models');
const CustomError = require('../lib/custom-error');
const transporter = require('../lib/mailer');
const {
  CLIENT_URL,
  LOCAL_PORT,
  SALT
} = require('../const');

class UsersController {
  #User;
  #AccessLink;
  #Types;
  #Limit;

  constructor () {
    this.#User = models.User;
    this.#AccessLink = models.AccessLink;
    this.#Types = models.Types;
    this.#Limit = models.Limit;
  }

  async registration (email, userType) {
    const candidate = await this.#User.findOne({ where: { email }});
    if (candidate) {
      throw new CustomError('failed', StatusCodes.BAD_REQUEST, 'User already exist');
    }

    const newUser = await this.#User.create({ email });

    const jwtPartOfLink = tokensController.generateJwtLink({
      userId: newUser.UUID,
      email,
      userType
    })

    const accessLink = `${CLIENT_URL}:${LOCAL_PORT}/success/${jwtPartOfLink}`;
    await this.#AccessLink.create({
      accessLink: jwtPartOfLink,
      UserUUID: newUser.UUID,
    });

    await transporter.sendMail({
      from: 'RMHTC <noreply@rmhtc.tech>',
      to: `${email}, ${email}`,
      subject: 'Registration on RMHTC Platform',
      text: `You access link is ${accessLink}`,
    });
  }

  async emailVerification (emailToken) {
    const { userId, userType } = tokensController.validateJwtLink(emailToken);

    const candidateLink = await this.#AccessLink.findOne({ where: { UserUUID: userId }});

    if (!candidateLink) {
      throw new CustomError('failed', StatusCodes.FORBIDDEN, 'Access Denied. Link isn\'t found');
    }

    if (emailToken !== candidateLink.accessLink) {
      throw new CustomError('failed', StatusCodes.FORBIDDEN, 'Access Denied. Link isn\'t compare');
    }
    const userScope = await this.#Types.findOne({ where: { typeName: userType }});
    const userLimit = await this.#Limit.findOne({ where: { limitsName: 'basic' }})
    await this.#User.update({
      emailVerified: true,
      TypeUUID: userScope.UUID,
      LimitUUID: userLimit.UUID,
    },
    { 
      where: {
        UUID: userId
      }
    });

    const updatedUser = await this.#User.findByPk(userId);

    return updatedUser;
  }

  async setPassword(uuid, password) {
    const salt = await bcrypt.genSalt(SALT);
    const hashedPassword = await bcrypt.hash(password, salt);
    await this.#User.update({
      password: hashedPassword,
    }, {
      where: {
        UUID: uuid
      }
    });
    await this.#AccessLink.destroy({
      where: {
        UserUUID: uuid
      }
    });
  }

  async authorization(email, password) {
    const user = await this.#User.findOne({
      where: { email },
      attributes: {
        exclude: [ 'TypeUUID', 'LimitUUID' ],
      },
      include: [{ model: this.#Types }, { model: this.#Limit }]
    });

    if (!user) {
      throw new CustomError('failed', StatusCodes.FORBIDDEN, 'Authorization data isn\'t valid');
    }

    const passwordIsMatch = bcrypt.compareSync(password, user.password);
    if (!passwordIsMatch) {
      throw new CustomError('failed', StatusCodes.FORBIDDEN, 'Authorization data isn\'t valid');
    }

    const accessToken = tokensController.generateAccessToken({
      uuid: user.UUID,
      email: user.email
    });

    const refreshToken = tokensController.generateRefreshToken({
      uuid: user.UUID,
      email: user.email
    });

    await tokensController.saveRefreshToken(user.UUID, refreshToken);

    const updatedUser = user.get();

    return {
      refreshToken,
      accessToken,
      updatedUser
    }
  }

  async authenticated(refreshToken) {
    if (!refreshToken) {
      throw new CustomError('failed', StatusCodes.FORBIDDEN, 'Authorization data isn\'t valid');
    }

    const { uuid, email } = tokensController.validateRefreshToken(refreshToken);
    await tokensController.findRefreshToken(uuid);
    const user = await this.#User.findOne({
      where: { email },
      attributes: {
        exclude: [ 'password', 'TypeUUID', 'LimitUUID' ],
      },
      include: [{ model: this.#Types }, { model: this.#Limit }]
    });
    if (!user) {
      throw new CustomError('failed', StatusCodes.FORBIDDEN, 'Authorization data isn\'t valid');
    }
    const newAccessToken = tokensController.generateAccessToken({ uuid, email });
    const newRefreshToken = tokensController.generateRefreshToken({ uuid, email });

    await tokensController.saveRefreshToken(uuid, newRefreshToken);

    return {
      newAccessToken,
      newRefreshToken,
      user,
    }
  }

  async logout(userUUID) {
    if (!userUUID) {
      throw new CustomError('failed', StatusCodes.FORBIDDEN, 'You wasn\'t authorize in the system');
    }

    const refreshToken = await tokensController.findRefreshToken(userUUID);
    if (!refreshToken) {
      throw new CustomError('failed', StatusCodes.FORBIDDEN, 'You wasn\'t authorize in the system');
    }

    await tokensController.removeRefreshToken(refreshToken.UUID);
  }

  async updateUsersPersonalData(userData, userUUID) {
    if (!userData) {
      throw new CustomError('failed', StatusCodes.BAD_REQUEST, 'You dont\'t sent data for update');
    }

    const updatedUserData = Object.assign({}, userData);

    await this.#User.update(updatedUserData, {
      where: {
        UUID: userUUID
      }
    });

    const updatedUser = await this.#User.findOne({
      where: {
        UUID: userUUID
      },
      attributes: {
        exclude: [ 'password', 'TypeUUID', 'LimitUUID' ],
      },
      include: [{ model: this.#Types }, { model: this.#Limit }]
    });

    return updatedUser;
  }
}

module.exports = UsersController;