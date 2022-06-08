const { DataTypes, Model } = require('sequelize');

class EmailTokens extends Model {};

const define = sequelize => EmailTokens.init({
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  emailToken: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'EmailTokens',
  tableName: 'email-tokens',
});

module.exports = define;