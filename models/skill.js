'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //user
      Skill.belongsTo(models.User, {
        foreignKey: 'users_id',
      });

      //reviews
      Skill.hasMany(models.Review, {
        foreignKey: 'skills_id',
      });
    }
  }
  Skill.init({
    users_id: DataTypes.BIGINT,
    name_skill: DataTypes.STRING,
    description_skill: DataTypes.STRING(500)
  }, {
    sequelize,
    modelName: 'Skill',
  });
  return Skill;
};