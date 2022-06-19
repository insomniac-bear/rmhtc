'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.AddressTypes, {
        foreignKey: 'adressTypeUuid',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      this.belongsTo(models.Countries, {
        foreignKey: 'countryUuid',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      this.belongsTo(models.Cities, {
        foreignKey: 'cityUuid',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      this.hasMany(models.Companies, {
        foreignKey: 'addressUuid',
      })
    }
  }
  Addresses.init({
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
  }, {
    sequelize,
    modelName: 'Addresses',
    tableName: 'addresses',
  });
  return Addresses;
};