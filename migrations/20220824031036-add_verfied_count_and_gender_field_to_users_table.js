'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'gender', {
      type: Sequelize.STRING,
      after: 'password',
      allowNull: false
    });

    await queryInterface.addColumn('users', 'verified_count', {
      type: Sequelize.INTEGER,
      after: "is_verified"
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'gender',);
    await queryInterface.removeColumn('users', 'verified_count');
  }
};
