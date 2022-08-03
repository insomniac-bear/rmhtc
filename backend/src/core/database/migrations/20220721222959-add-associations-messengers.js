'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addColumn(
      'messengers',
      'messengerTypeUuid',
      {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'messenger_types',
          key: 'uuid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    .then(() => queryInterface.addColumn(
      'messengers',
      'companyUuid',
      {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'companies',
          key: 'uuid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    ));
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn(
      'messengers',
      'messengerTypeUuid',
    )
    .then(() => queryInterface.removeColumn(
      'messengers',
      'companyUuid',
    ));
  }
};
