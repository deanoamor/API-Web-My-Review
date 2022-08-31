'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('contacts', 'users_id', {
      type: Sequelize.BIGINT,
      after: "id"
    });

    await queryInterface.addConstraint('contacts', {
      fields: ['users_id'],
      type: 'foreign key',
      name: 'contacts_users_id_foreign_key',
      references: {
        table: 'users',
        field: 'id'
      }
    });


  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('contacts', 'contacts_users_id_foreign_key');
    await queryInterface.removeColumn('contacts', 'users_id');
  }
};
