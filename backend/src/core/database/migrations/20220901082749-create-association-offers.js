'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface
      .addColumn('offers', 'currencyUuid', {
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'currencies',
          key: 'uuid',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      })
      .then(() => {
        return queryInterface
          .addColumn('offers', 'companyUuid', {
            type: Sequelize.DataTypes.UUID,
            references: {
              model: 'companies',
              key: 'uuid',
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          })
          .then(() => {
            return queryInterface.addColumn('offers', 'moderationUuid', {
              type: Sequelize.DataTypes.UUID,
              references: {
                model: 'moderation',
                key: 'uuid',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            });
          })
          .then(() => {
            return queryInterface.addColumn('offers', 'offerTypeUuid', {
              type: Sequelize.DataTypes.UUID,
              references: {
                model: 'offer_types',
                key: 'uuid',
              },
              onUpdate: 'CASCADE',
              onDelete: 'SET NULL',
            });
          });
      });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface
      .removeColumn('offers', 'currencyUuid')
      .then(() => {
        return queryInterface.removeColumn('offers', 'companyUuid');
      })
      .then(() => {
        return queryInterface.removeColumn('offers', 'moderationUuid');
      })
      .then(() => {
        return queryInterface.removeColumn('offers', 'offerTypeUuid');
      });
  },
};
