'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //user
      Review.belongsTo(models.User, {
        foreignKey: 'users_id',
      });

      //skill
      Review.belongsTo(models.Skill, {
        foreignKey: 'skills_id',
      });
    }
  }
  Review.init({
    users_id: DataTypes.BIGINT,
    my_id: DataTypes.BIGINT,
    skills_id: DataTypes.BIGINT,
    description_review: DataTypes.STRING(500),
    status_review: DataTypes.STRING,
    star_review: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};