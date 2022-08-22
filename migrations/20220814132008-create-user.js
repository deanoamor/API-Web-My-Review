'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email:{
        type: Sequelize.STRING,
        allowNull: false
      },
      password:{
        type: Sequelize.STRING,
        allowNull: false
      },
      image_name_user:{
        type: Sequelize.STRING,
      },
      image_path_user:{
        type: Sequelize.STRING,
      },
      description_user:{
        type: Sequelize.STRING(2000),
      },
      role_user:{
        type: Sequelize.STRING,
        allowNull: false
      },
      status_user:{
        type: Sequelize.STRING,
        allowNull: false
      },
      is_verified:{
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      star_user:{
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};