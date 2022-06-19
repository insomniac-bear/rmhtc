'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.ContactTypes, {
        foreignKey: 'contactTypeUuid',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      this.hasMany(models.Companies, {
        foreignKey: 'contactUuid',
      });
    }
  }
  Contacts.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false,
    },
  }, {
    sequelize,
    modelName: 'Contacts',
    tableName: 'contacts',
  });
  return Contacts;
};