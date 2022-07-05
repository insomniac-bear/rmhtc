const { StatusCodes } = require('http-status-codes');
const errorResponse = require('../lib/error-response');
const usersService = require('./users.service');
const userDto = require('./dto/userDto');
const CustomError = require('../lib/custom-error');
const {
  getUsersAllCompanyCount,
  getUsersModeratedCompanyCount
} = require('../companies/companies.service');

class UsersController {
  constructor () {
  }

  async getAllUsers (req, res, next) {
    try {
      const users = await usersService.getAllUsers();
      return res
        .status(StatusCodes.OK)
        .json({
          status: 'success',
          data: users
        });
    } catch (err) {
      errorResponse(err, res, next);
    }
  }

  async createUser (req, res, next) {
    try {
      const userData = req.body;

      const newUser = await usersService.createUser(userData);
      return res
        .status(StatusCodes.OK)
        .json({
          status: 'success',
          data: newUser
        })
    } catch (err) {
      errorResponse(err, res, next);
    }
  }

  async updateUser (req, res, next) {
    try {
      const userData = new userDto(req.body);
      const userUuid = req.userUuid;
      const accessToken = req.newAccessToken;
      const refreshToken = req.newRefreshToken;

      const isUpdate = await usersService.updateUser(userUuid, userData);

      if (isUpdate.length < 0) {
        throw new CustomError('failed', StatusCodes.INTERNAL_SERVER_ERROR, 'Some problem with update user');
      }

      const updatedUser = await usersService.getUserById(userUuid);
      const updatedUserData = new userDto(updatedUser);
      const companyCount = await getUsersAllCompanyCount(userUuid);
      const moderatedCompanyCount = await getUsersModeratedCompanyCount(userUuid);

      res.cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: 'lax',
      });
      return res
      .status(StatusCodes.OK)
      .json({
        status: 'success',
        accessToken,
        user: updatedUserData,
        companyCount,
        moderatedCompanyCount,
      });
    } catch (err) {
      errorResponse(err, res, next);
    }
  }
}

module.exports = new UsersController();