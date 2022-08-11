'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('countries', [
      {
        uuid: uuidv4(),
        value: 'Russia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        value: 'Malaysia',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        value: 'Singapore',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        value: 'China',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        value: 'Thailand',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('countries', null, {});
  }
};
