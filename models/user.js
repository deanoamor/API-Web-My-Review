'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //reviews
      User.hasMany(models.Review, {
        foreignKey: 'users_id',
      });

      //skills
      User.hasMany(models.Skill, {
        foreignKey: 'users_id',
      });

      //contacts
      User.hasMany(models.Contact, {
        foreignKey: 'users_id',
      });

      //tokens
      User.hasMany(models.Token, {
        foreignKey: 'users_id',
      });

      //jobs
      User.hasMany(models.Job, {
        foreignKey: 'users_id',
      });

      //portfolios
      User.hasMany(models.Portfolio, {
        foreignKey: 'users_id',
      });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image_name_user: DataTypes.STRING,
    image_path_user: DataTypes.STRING,
    description_user: DataTypes.STRING(2000),
    role_user: DataTypes.STRING,
    status_user: DataTypes.STRING,
    is_verified: DataTypes.BOOLEAN,
    star_user: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};