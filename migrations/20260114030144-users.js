'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', { 
      id_users: {
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true,
        allowNull: false
      },
      id_user_role: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user_role',
          key: 'id_user_role'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      email: { 
        type: Sequelize.STRING, 
        allowNull: false,
        unique: true 
      },
      password: {
        type: Sequelize.STRING, 
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
