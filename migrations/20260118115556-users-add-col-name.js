'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users','name_users', {
       type: Sequelize.STRING,
        allowNull: false
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'name_users');
  }
};
