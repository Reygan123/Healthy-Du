'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Weeks', [{
      name: 'Minggu 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Minggu 2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Minggu 3',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Minggu 4',
      createdAt: new Date(),
      updatedAt: new Date(),
    },], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Weeks', null, {});
  }
};
