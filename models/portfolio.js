'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Portfolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //user
      Portfolio.belongsTo(models.User, {
        foreignKey: 'users_id',
      });
    }
  }
  Portfolio.init({
    name_portfolio: DataTypes.STRING,
    description_portfolio: DataTypes.STRING(500),
    link_portfolio: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Portfolio',
  });
  return Portfolio;
};