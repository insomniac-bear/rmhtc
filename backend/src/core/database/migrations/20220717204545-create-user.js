'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;
    return await queryInterface.createTable('users', {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(1000),
        defaultValue: undefined,
        allowNull: true,
      },
      businessRole: {
        type: DataTypes.STRING,
        defaultValue: undefined,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: undefined,
        allowNull: true,
      },
      surname: {
        type: DataTypes.STRING,
        defaultValue: undefined,
        allowNull: true,
      },
      avatarUrl: {
        type: DataTypes.STRING,
        defaultValue: undefined,
        allowNull: true,
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
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface) {
    return await queryInterface.dropTable('users');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
