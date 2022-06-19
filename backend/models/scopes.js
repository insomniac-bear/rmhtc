'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scopes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Roles, {
        foreignKey: 'scopesUuid',
      })
    }
  }
  Scopes.init({
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
      defaultValue: 'BaseUser'
    },
    scope: {
      type: DataTypes.JSONB,
      defaultValue: {
        "profile": "['read', 'update']",
        "companies": "['read', 'update']"
      },
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Scopes',
    tableName: 'scopes',
  });
  return Scopes;
};