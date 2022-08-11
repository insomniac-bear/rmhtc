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
      'addresses',
      'addressTypeUuid',
      {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'address_types',
          key: 'uuid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    .then(() => {
      return queryInterface.addColumn(
        'addresses',
        'companyUuid',
        {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: 'companies',
            key: 'uuid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'addresses',
        'countryUuid',
        {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: 'countries',
            key: 'uuid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'addresses',
        'cityUuid',
        {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: 'cities',
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
      'addresses',
      'addressTypeUuid',
    )
    .then(() => {
      return queryInterface.removeColumn(
        'addresses',
        'countryUuid',
      )
    })
    .then(() => {
      return queryInterface.removeColumn(
        'addresses',
        'cityUuid',
      )
    })
  }
};
