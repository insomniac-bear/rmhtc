const { DataTypes, Model } = require('sequelize');

class Users extends Model {};

const define = sequelize => Users.init({
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

module.exports = define;