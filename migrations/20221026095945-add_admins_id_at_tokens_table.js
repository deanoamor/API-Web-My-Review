'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('tokens', 'admins_id', {
      type: Sequelize.BIGINT,
      after: "users_id",
      allownull: true
    });

    await queryInterface.addConstraint('tokens', {
      fields: ['admins_id'],
      type: 'foreign key',
      name: 'tokens_admins_id_foreign_key',
      references: {
        table: 'Admins',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tokens', 'tokens_admins_id_foreign_key');
    await queryInterface.removeColumn('tokens', 'admins_id');
  }
};
