'use strict';

const sequelize = require("../src/config/database");

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('questions', { 
      id_questions : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      question_text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      question_type: {
        type: Sequelize.ENUM("Y/N", "suggest"),
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
    await queryInterface.dropTable('questions');
    
  }
};
