'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        foreignKey: 'userUuid',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      this.belongsTo(models.Addresses, {
        foreignKey: 'addressUuid',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      this.belongsTo(models.Contacts, {
        foreignKey: 'contactUuid',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      this.belongsTo(models.Messengers, {
        foreignKey: 'messengerUuid',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      this.belongsTo(models.LegalForms, {
        foreignKey: 'legalFormUuid',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      this.belongsTo(models.BusinessTypes, {
        foreignKey: 'businessTypeUuid',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }
  Companies.init({
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
    seoDocUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    qcEmployes: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    moderated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    moderatedReason: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
  }, {
    sequelize,
    modelName: 'Companies',
    tableName: 'companies',
  });
  return Companies;
};