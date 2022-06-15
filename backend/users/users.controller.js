const { StatusCodes } = require('http-status-codes');
const errorResponse = require('../lib/error-response');
const usersService = require('./users.service');

class UsersController {
  constructor () {
  }

  async getAllUsers (req, res, next) {
    try {
      const users = await usersService.getAllUsers();
      console.log(users)
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
}

module.exports = new UsersController();