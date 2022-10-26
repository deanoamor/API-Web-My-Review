'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //user
      Token.belongsTo(models.User, {
        foreignKey: 'users_id',
      });

      //admin
      Token.belongsTo(models.Admin, {
        foreignKey: 'admins_id',
      });
    }
  }
  Token.init({
    users_id: DataTypes.BIGINT,
    admins_id: DataTypes.BIGINT,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};