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
    return queryInterface.bulkInsert('legal_forms', [
      {
        uuid: uuidv4(),
        value: 'Limited Liability Company',
        shortValue: 'LLC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        value: 'Limited trade development',
        shortValue: 'Ltd',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        value: 'Limited Liability Partnerships',
        shortValue: 'LLP',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        value: 'Open Joint Stock Company',
        shortValue: 'OJCS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        value: 'Individual Entrepreneur ',
        shortValue: null,
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
    return queryInterface.bulkDelete('legal_forms', null, {});
  }
};
