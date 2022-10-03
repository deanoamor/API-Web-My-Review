'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //user
      Contact.belongsTo(models.User, {
        foreignKey: 'users_id',
      });
    }
  }
  Contact.init({
    users_id: DataTypes.BIGINT,
    name_contact: DataTypes.STRING,
    description_contact: DataTypes.STRING(500),
    link_contact: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};