const { DataTypes, Model } = require('sequelize');

class Roles extends Model {};

const define = sequelize => Roles.init({
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

module.exports = define;