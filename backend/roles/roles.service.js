const { StatusCodes } = require('http-status-codes');
const CustomError = require('../lib/custom-error');
const { Roles, Scopes } = require('../models');

/**
 * Функция создания роли для пользователя
 * @param {String} userUuid
 * @param {String} roleName
 * @param {Array of String} category
 * @returns
 */
async function createRole(roleName, category) {
  const scope = await Scopes.findOne({
    where: {
      name: roleName,
    },
  });
  // const roleCategory = JSON.stringify(category);
  const newRole = Roles.build({
    name: roleName,
    category,
    scopesUuid: scope.uuid,
  });
  await newRole.save();
  return newRole;
}

module.exports = {
  createRole,
}
