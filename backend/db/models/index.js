const { DataTypes } = require('sequelize');
const sequelize = require('../sequilize');

const Users = require('./users.model')(sequelize);
const RefreshTokens = require('./refresh-tokens.model')(sequelize);
const EmailTokens = require('./email-tokens.model')(sequelize);

EmailTokens.belongsTo(Users, {
  foreignKey: {
    name: 'userUuid',
    allowNull: false,
  }
});
Users.hasOne(EmailTokens);

module.exports = {
  Users,
  RefreshTokens,
  EmailTokens,
}