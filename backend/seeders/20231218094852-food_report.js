'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Food_Reports', [{
      user_id: 1,
      meal_id: 1,
      food_id: 1,
      amount: 100,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: 1,
      meal_id: 1,
      food_id: 2,
      amount: 100,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: 1,
      meal_id: 2,
      food_id: 1,
      amount: 100,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Food_Reports', null, {});
  }
};
