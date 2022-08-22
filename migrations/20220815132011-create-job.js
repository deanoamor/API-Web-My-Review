'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      users_id:{
        type: Sequelize.BIGINT,
        allowNull: false
      },
      name_job:{
        type: Sequelize.STRING,
        allowNull: false
      },
      place_job:{
        type: Sequelize.STRING,
        allowNull: false
      },
      description_job: {
        type: Sequelize.STRING(500)
      },
      position_job:{
        type: Sequelize.STRING,
        allowNull: false
      },
      start_date_job:{
        type: Sequelize.STRING,
        allowNull: false
      },
      end_date_job:{
        type: Sequelize.STRING,
        allowNull: false
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

    await queryInterface.addConstraint('Jobs', {
      fields: ['users_id'],
      type: 'foreign key',
      name: 'Jobs_users_id_foreign_key',
      references: {
        table: 'Users',
        field: 'id'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Jobs');
  }
};