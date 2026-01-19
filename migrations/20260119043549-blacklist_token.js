// migration untuk tabel blacklist_token
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blacklist_token', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expiredAt: {
        type: Sequelize.DATE,
        allowNull: true, // optional
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('blacklist_token');
  }
};
