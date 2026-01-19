'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  

     await queryInterface.bulkInsert('questions', [
      {
        question_text: 'Apakah anda dimintai sesuatu yang berhubungan dengan kerjasama oleh pihak PT Hirose Electric Indnesia (uang, hadiah, dan lain-lain)?',
        question_type: 'Y/N',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question_text: 'Apakah anda diintimidasi agar mengurangi harga atau ketentuan terkait kerjasama?',
        question_type: 'Y/N',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question_text: 'Apakah anda dimintai sesuatu oleh pihak security untuk kelancaran keluar masuk kendaraan (uang, hadiah, dan lain-lain)?',
        question_type: 'Y/N',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question_text: 'Apakah anda pernah melihat praktik suap di lingkungan PT Hirose Electric Indonesia?',
        question_type: 'Y/N',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question_text: 'Apakah anda menerima kekerasan verbal maupun non verbal dari karyawan PT Hirose Electric Indonesia?',
        question_type: 'Y/N',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        question_text: 'Sampaikan kritik / saran anda !',
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
