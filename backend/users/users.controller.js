const { StatusCodes } = require('http-status-codes');
const CustomError = require('../lib/custom-error');
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

  async createUser (req, res, next) {
    try {
      const userData = req.body;
      console.log(userData)
      const newUser = await usersService.createUser(userData);
      return res
        .status(StatusCodes.OK)
        .json({
          status: 'success',
          data: newUser
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

module.exports = new UsersController();