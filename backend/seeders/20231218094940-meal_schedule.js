'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Meal_Schedules', [{
      name: 'Makan Pagi',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Makan Siang',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Makan Malam',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Cemilan/Lainnya',
      createdAt: new Date(),
      updatedAt: new Date(),
    },], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Meal_Schedules', null, {});
  }
};
