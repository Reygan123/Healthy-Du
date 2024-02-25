'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Courses', [{
      name: 'Dada Pemula',
      description: "Program latihan untuk melatih dada kamu khusus pemula",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Dada Menengah',
      description: "Program latihan untuk melatih dada kamu khusus menengah",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Dada Pro',
      description: "Program latihan untuk melatih dada kamu khusus pro",
      createdAt: new Date(),
      updatedAt: new Date(),
    },], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Courses', null, {});
  }
};
