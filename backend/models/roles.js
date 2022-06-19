'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, {
        foreignKey: 'userUuid',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      this.belongsTo(models.Scopes, {
        foreignKey: 'scopesUuid',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Roles.init({
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
    category: {
      type: DataTypes.JSONB,
      defaultValue: ['all'],
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Roles',
    tableName: 'roles',
  });
  return Roles;
};