'use strict';

const sequelize = require("../src/config/database");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('answers', { 
      id_answers: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      id_questions: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'questions',
          key: 'id_questions',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      answer_value: {
        type: Sequelize.TEXT,
        allowNull: true
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('answers');
  }
};
