'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.EmailTokens, {
        foreignKey: 'userUuid',
      });
      this.hasOne(models.RefreshTokens, {
        foreignKey: 'userUuid',
      });
      this.belongsTo(models.Roles, {
        foreignKey: 'roleUuid',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
      this.hasMany(models.Companies, {
        foreignKey: 'userUuid',
      })
    }
  }
  Users.init({
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
      type: DataTypes.STRING,
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
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
  });
  return Users;
};