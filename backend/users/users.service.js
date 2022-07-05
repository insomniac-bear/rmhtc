const { StatusCodes } = require('http-status-codes');
const { Sequelize } = require('sequelize');
const CustomError = require('../lib/custom-error');
const { Users, Companies, Roles, Scopes } = require('../models');

/**
 * Функция получения всех users из БД
 * @returns {Array of Object} users
 */
async function getAllUsers () {
  const users = await Users.findAll();
  if (!users.length) {
    throw new CustomError('failed', StatusCodes.NOT_FOUND, 'Users not found in the db');
  }

  return users;
}

/**
 * Функция поиска user по uuid
 * @param {String} uuid - уникальный идентификатор пользователя
 * @returns {Object} user
 */
async function getUserById (uuid) {
  const user = await Users.findByPk(uuid,
    {
      attributes: {
        exclude: ['password', 'updatedAt', 'createdAt', 'roleUuid'],
      },
      include: [
        {
          model: Roles,
          attributes: {
            exclude: ['scopesUuid', 'updatedAt', 'createdAt']
          },
          include: [
            {
              model: Scopes,
              attributes: {
               exclude: ['uuid', 'updatedAt', 'createdAt']
              }
            }
          ]
        }
      ]
    }
  );
  if (!user) {
    throw new CustomError('failed', StatusCodes.NOT_FOUND, 'User not found');
  }

  return user;
}

/**
 * Поиск пользователя по полю
 * @param {String} param - название поля по которому осуществляется поиск
 * @param {String | Number | Date} value - значение поля по которому осуществляется поиск
 * @returns {Object} user
 */
async function getUserByParam (param, value) {
  const user = await Users.findOne({
    where: {
      [param]: value,
    },
    attributes: {
      exclude: ['updatedAt', 'createdAt', 'roleUuid'],
    },
    include: [
      {
        model: Roles,
        attributes: {
          exclude: ['scopesUuid', 'updatedAt', 'createdAt']
        },
        include: [
          {
            model: Scopes,
            attributes: {
             exclude: ['uuid', 'updatedAt', 'createdAt']
            }
          }
        ]
      }
    ]
  })
  if (!user) {
    return undefined;
  }

  return user;
}

/**
 * Функция сохранения нового пользователя в БД
 * @param {Object} user
 * @returns {Object} new user
 */
async function createUser (user) {
  const newUser = Users.build(user);
  await newUser.save();
  return newUser;
}

/**
 * Функция обновления данных о пользователе в БД.
 * @param {String} uuid - uuid обновляемого пользователя
 * @param {Object} updateData - объект с данными о пользователе
 * @returns user
 */
async function updateUser (uuid, updateData) {
  if (!updateData) {
    throw new CustomError('failed', StatusCodes.BAD_REQUEST, 'You dont\'t sent data for update');
  }

  const user = Users.findByPk(uuid);
  if (!user) {
    throw new CustomError('failed', StatusCodes.NOT_FOUND, 'user not found');
  }

  const updateUserData = Object.assign({}, updateData);

  return await Users.update(updateUserData, {
    where: {
      uuid,
    }
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByParam,
  createUser,
  updateUser
};