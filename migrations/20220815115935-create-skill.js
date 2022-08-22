'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Skills', {
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
      skill:{
        type: Sequelize.STRING,
        allowNull: false
      },
      description_skill: {
        type: Sequelize.STRING(500),
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

    await queryInterface.addConstraint('Skills', {
      fields: ['users_id'],
      type: 'foreign key',
      name: 'Skills_users_id_foreign_key',
      references: {
        table: 'Users',
        field: 'id'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Skills');
  }
};