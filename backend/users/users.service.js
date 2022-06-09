const { StatusCodes } = require('http-status-codes');
const CustomError = require('../lib/custom-error');
const { Users } = require('../db/models');

async function getAllUsers () {
  const users = await Users.findAll();
  if (!users.length) {
    throw new CustomError('failed', StatusCodes.NOT_FOUND, 'Users not found in the db');
  }

  return users;
}

async function getUserById (uuid) {
  const user = await Users.findByPk(uuid);
  if (!users) {
    throw new CustomError('failed', StatusCodes.NOT_FOUND, 'User not found');
  }

  return user;
}

async function getUserByParam (param, value) {
  const user = await Users.findOne({
    where: {
      [param]: value,
    }
  })
  if (!user) {
    return undefined;
  }

  return user;
}

async function createUser (user) {
  const newUser = Users.build(user);
  await newUser.save();
  return newUser;
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByParam,
  createUser
};