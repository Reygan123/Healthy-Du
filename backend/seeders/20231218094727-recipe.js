'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Recipes', [{
      name: 'Nasi',
      description: '1/2 gram (g) cabai merah atau rawit, 10 gram (g) bawang putih, 9 gram (g) bawang merah, 3 ml minyak goreng, 60 gram (g) kangkung',
      time_prepare: 5,
      time_cooking: 8,
      tutorial: '1. Tumis bawang merah dan bawang putih sampai harum dalam minyak goreng, 2. Masukan cabai dan kangkung, 3. Tumis hingga layu',
      image_url: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Nasgor Receh',
      description: '50 gram (g) nasi putih, 1 sdm cabai merah atau rawit, 1 siung bawang putih, 50 g mie basah matang, 25 g sosis ayam kombinasi',
      time_prepare: 3,
      time_cooking: 5,
      tutorial: 'Lorem Ipsum',
      // tutorial: '1. Tumis bawang merah dan bawang putih sampai harum dalam minyak goreng, 2. Masukan cabai yang telah dihaluskan, 3. Tambahkan sosis dan mie shirataki, 4. Tambahkan nasi tunggu sampai di rasa sudah cukup matang, 5. Jika suka bisa di tambahkan telur ceplok, telur rebus atau bakso',
      image_url: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Recipes', null, {});
  }
};
