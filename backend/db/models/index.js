const { DataTypes } = require('sequelize');
const sequelize = require('../sequilize');

const Users = require('./users.model')(sequelize);
const RefreshTokens = require('./refresh-tokens.model')(sequelize);
const EmailTokens = require('./email-tokens.model')(sequelize);
const Roles = require('./roles.model')(sequelize);
const Scopes = require('./scopes.model')(sequelize);

EmailTokens.belongsTo(Users, {
  foreignKey: 'userUuid',
  as: 'emailTokens',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Users.hasOne(EmailTokens, {
  foreignKey: 'userUuid'
});

Roles.belongsTo(Users, {
  foreignKey: 'userUuid',
  as: 'roles',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Users.hasOne(Roles, {
  foreignKey: 'userUuid'
});

Roles.belongsTo(Roles, {
  foreignKey: 'scopesUuid',
  as: 'roles',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
Scopes.hasMany(Roles, {
  foreignKey: 'scopesUuid'
})

module.exports = {
  Users,
  RefreshTokens,
  EmailTokens,
  Roles,
  Scopes,
}