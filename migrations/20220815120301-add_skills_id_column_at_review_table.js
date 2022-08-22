'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Reviews', 'skills_id', {
      type: Sequelize.BIGINT,
      after: 'users_id'
    });

    await queryInterface.addConstraint('Reviews', {
      fields: ['skills_id'],
      type: 'foreign key',
      name: 'Reviews_skills_id_foreign_key',
      references: {
        table: 'Skills',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Reviews', 'Reviews_skills_id_foreign_key');
    await queryInterface.removeColumn('Reviews', 'skills_id');
  }
};
