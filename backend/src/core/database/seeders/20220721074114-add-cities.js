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
    return queryInterface.bulkInsert('cities', [
      {
        uuid: uuidv4(),
        value: 'Moscow',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        value: 'St. Petersburg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        value: 'Novosibirsk',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        value: 'Ekaterinburg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        value: 'Kuala Lumpur',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        value: 'Seberang Perai',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        value: 'Subang Jaya',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        value: 'George Town',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        value: 'Pekin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        value: 'Singapore',
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
    return queryInterface.bulkDelete('cities', null, {});
  }
};
