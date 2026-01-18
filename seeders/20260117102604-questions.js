'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  

     await queryInterface.bulkInsert('questions', [
      {
        question_text: 'pertanyaan 1',
        question_type: 'Y/N',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question_text: 'pertanyaan 2',
        question_type: 'Y/N',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question_text: 'pertanyaan 3',
        question_type: 'Y/N',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question_text: 'pertanyaan 4',
        question_type: 'Y/N',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question_text: 'pertanyaan 5',
        question_type: 'Y/N',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question_text: 'pertanyaan 6',
        question_type: 'suggest',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], 
    {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('questions', null, {});
  }
};
