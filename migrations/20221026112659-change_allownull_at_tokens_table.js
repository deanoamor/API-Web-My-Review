'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('tokens', 'users_id', {
      type: Sequelize.BIGINT,
      allownull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('tokens', 'users_id', {
      type: Sequelize.BIGINT,
      allownull: false
    });
  }
};
