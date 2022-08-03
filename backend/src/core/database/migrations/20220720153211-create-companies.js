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
    return await queryInterface.createTable('companies', {
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
      },
      logoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      regNumName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      regNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      regDocUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      issuingAuthority: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      yearOfFoundation: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      ceo: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      ceoDocUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      qcEmployees: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      budgetOfYear: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      currencyOfBudget: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      moderated: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'idle',
      },
      moderatedReason: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
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
    return await queryInterface.dropTable('companies');
  }
};
