const { DataTypes, Model } = require('sequelize');

class RefreshTokens extends Model {};

const define = sequelize => RefreshTokens.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'RefreshTokens',
  tableName: 'refresh_tokens',
});

module.exports = define;