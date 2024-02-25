'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Program_Exercises', [{
      program_id: 1,
      exercise_id: 901,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      program_id: 1,
      exercise_id: 902,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      program_id: 1,
      exercise_id: 903,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      program_id: 1,
      exercise_id: 904,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      program_id: 1,
      exercise_id: 905,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      program_id: 1,
      exercise_id: 906,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      program_id: 2,
      exercise_id: 907,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      program_id: 2,
      exercise_id: 902,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      program_id: 2,
      exercise_id: 908,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      program_id: 2,
      exercise_id: 909,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      program_id: 2,
      exercise_id: 910,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      program_id: 2,
      exercise_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    {
      program_id: 3,
      exercise_id: 907,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      program_id: 3,
      exercise_id: 902,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      program_id: 3,
      exercise_id: 908,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      program_id: 3,
      exercise_id: 909,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      program_id: 3,
      exercise_id: 910,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      program_id: 3,
      exercise_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    {
      program_id: 4,
      exercise_id: 907,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      program_id: 4,
      exercise_id: 902,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      program_id: 4,
      exercise_id: 908,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      program_id: 4,
      exercise_id: 909,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      program_id: 4,
      exercise_id: 910,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      program_id: 4,
      exercise_id: 912,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Program_Exercises', null, {});
  }
};
