const { StatusCodes } = require('http-status-codes');
const errorResponse = require('../lib/error-response');
const usersService = require('./users.service');
const userDto = require('./dto/userDto');

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
      const userData = userDto(req.body);
      const userUUID = req.userUUID;
      const accessToken = req.newAccessToken;
      const refreshToken = req.newRefreshToken;

    } catch (err) {}
  }
}

module.exports = new UsersController();