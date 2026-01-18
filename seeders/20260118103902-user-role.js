'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('user_role', [
      {
        name_role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name_role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_role', null, {});
  }
};
