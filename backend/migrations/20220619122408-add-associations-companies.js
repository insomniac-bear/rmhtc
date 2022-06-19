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
      'companies',
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
        'companies',
        'addressUuid',
        {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: 'addresses',
            key: 'uuid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'companies',
        'contactUuid',
        {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: 'contacts',
            key: 'uuid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'companies',
        'messangerUuid',
        {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: 'messengers',
            key: 'uuid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'companies',
        'legalFormUuid',
        {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: 'legal_forms',
            key: 'uuid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'companies',
        'businessTypeUuid',
        {
          type: Sequelize.DataTypes.UUID,
          references: {
            model: 'business_types',
            key: 'uuid',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
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
      'companies',
      'userUuid',
    )
    .then(() => {
      return queryInterface.removeColumn(
        'companies',
        'addressUuid',
      )
    })
    .then(() => {
      return queryInterface.removeColumn(
        'companies',
        'contactUuid',
      )
    })
    .then(() => {
      return queryInterface.removeColumn(
        'companies',
        'messangerUuid',
      )
    })
    .then(() => {
      return queryInterface.removeColumn(
        'companies',
        'legalFormUuid',
      )
    })
    .then(() => {
      return queryInterface.removeColumn(
        'companies',
        'businessTypeUuid',
      )
    })
  }
};
