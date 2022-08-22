'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
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
      my_id:{
        type: Sequelize.BIGINT,
      },
      description_review: {
        type: Sequelize.STRING(500)
      },
      status_review:{
        type: Sequelize.STRING
      },
      star_review:{
        type: Sequelize.FLOAT,
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

    await queryInterface.addConstraint('Reviews', {
      fields: ['users_id'],
      type: 'foreign key',
      name: 'Reviews_users_id_foreign_key',
      references: {
        table: 'Users',
        field: 'id'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  }
};