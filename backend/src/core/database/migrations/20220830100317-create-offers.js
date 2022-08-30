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
    return await queryInterface.createTable('offers', {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      priceComment: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
      },
      moderated: {
        type: DataTypes.ENUM('idle', 'pending', 'process', 'success', 'failed'),
        allowNull: false,
        unique: false,
        defaultValue: 'idle',
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
    return await queryInterface.dropTable('offers');
  },
};
