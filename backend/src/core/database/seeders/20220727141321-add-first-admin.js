'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const roles = await queryInterface.sequelize.query(
      'SELECT uuid from ROLES;'
    );

    const rolesUuid = roles[0];

    return queryInterface.bulkInsert('users', [
      {
        uuid: uuidv4(),
        email: 'support@add.company',
        emailVerified: true,
        password: '',
        businessRole: 'Менеджер ITC',
        name: 'Support',
        surname: 'ITC',
        avatarUrl: null,
        roleUuid: rolesUuid[1].uuid,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});
  },
};
