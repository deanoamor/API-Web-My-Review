'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //token
      Admin.hasMany(models.Token, {
        foreignKey: 'admins_id',
      });
    }
  }
  Admin.init({
    adminname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_admin: DataTypes.STRING,
    status_admin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};