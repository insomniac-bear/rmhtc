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
    return queryInterface.bulkInsert('scopes', [
      {
        uuid: uuidv4(),
        name: 'BASE USER',
        scope: JSON.stringify({
          "profile": "['read', 'update']",
          "companies": "['read', 'update']"
        }),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        uuid: uuidv4(),
        name: 'USER',
        scope: JSON.stringify({
          profile: ['read', 'update'],
          companies: ['read', 'update'],
          offers: ['create', 'read', 'update', 'delete'],
          requests: ['create', 'read', 'update', 'delete'],
          news: ['create', 'read', 'update', 'delete']
        }),
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
    return queryInterface.bulkDelete('scopes', null, {});
  }
};
