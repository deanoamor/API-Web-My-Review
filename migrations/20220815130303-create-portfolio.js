'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Portfolios', {
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
      name_portfolio:{
        type: Sequelize.STRING,
        allowNull: false
      },
      description_portfolio: {
        type: Sequelize.STRING(500)
      },
      link_portfolio:{
        type: Sequelize.STRING
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

    await queryInterface.addConstraint('Portfolios', {
      fields: ['users_id'],
      type: 'foreign key',
      name: 'Portfolios_users_id_foreign_key',
      references: {
        table: 'Users',
        field: 'id'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Portfolios');
  }
};