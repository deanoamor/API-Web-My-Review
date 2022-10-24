'use strict';

//hash password
const passwordHash = require('password-hash');

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Admins', [{
      adminname: 'admin1',
      email: 'admin1@gmail.com',
      password: passwordHash.generate('admin1password'),
      role_admin: 'Admin',
      status_admin: 'Active',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Admins', null, {});
  }
};
