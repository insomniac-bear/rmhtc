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
    return queryInterface.bulkInsert('contact_types', [
      {
        uuid: uuidv4(),
        value: 'Work phone',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        value: 'Mobile phone',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        value: 'Fax',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        value: 'Email',
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
    return queryInterface.bulkDelete('contact_types', null, {});
  }
};
