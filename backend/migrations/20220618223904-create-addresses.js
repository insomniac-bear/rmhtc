'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     const { DataTypes } = Sequelize;
     return await queryInterface.createTable('addresses', {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      postCode: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
        defaultValue: null,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
        defaultValue: null,
      },
      streetNum: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
        defaultValue: null,
      },
      buildNum: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
        defaultValue: null,
      },
      roomNum: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: false,
        defaultValue: null,
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

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return await queryInterface.dropTable('addresses');
  }
};
