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
      'roles',
      'userUuid',
      {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'users',
          key: 'uuid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    .then(() => {
      return queryInterface.addColumn(
        'roles',
        'scopesUuid',
        {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: 'scopes',
            key: 'uuid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn(
      'roles',
      'userUuid',
    )
    .then(() => {
      return queryInterface.removeColumn(
        'roles',
        'scopesUuid',
      )
    });
  }
};
