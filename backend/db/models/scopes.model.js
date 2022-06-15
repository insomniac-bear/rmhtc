const { DataTypes, Model } = require('sequelize');

class Scopes extends Model {};

const define = sequelize => Scopes.init({
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

module.exports = define;