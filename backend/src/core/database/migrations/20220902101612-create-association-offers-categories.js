'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const { DataTypes } = Sequelize;
    return await queryInterface.createTable('offers_categories', {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      offerUuid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: { model: 'offers', key: 'uuid' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      typeUuid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: { model: 'categories', key: 'uuid' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return await queryInterface.dropTable('offers_categories');
  },
};
