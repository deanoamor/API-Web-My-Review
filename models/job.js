'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      //user
      Job.belongsTo(models.User, {
        foreignKey: 'users_id',
      });
    }
  }
  Job.init({
    users_id: DataTypes.BIGINT,
    name_job: DataTypes.STRING,
    place_job: DataTypes.STRING,
    description_job: DataTypes.STRING(500),
    position_job: DataTypes.STRING,
    start_date_job: DataTypes.STRING,
    end_date_job: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};