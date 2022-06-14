const { DataTypes } = require('sequelize');
const sequelize = require('../sequilize');

const Users = require('./users.model')(sequelize);
const RefreshTokens = require('./refresh-tokens.model')(sequelize);
const EmailTokens = require('./email-tokens.model')(sequelize);

EmailTokens.belongsTo(Users, {
  foreignKey: 'userUuid',
  as: 'emailTokens',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Users.hasOne(EmailTokens, {
  foreignKey: 'userUuid'
});

module.exports = {
  Users,
  RefreshTokens,
  EmailTokens,
}