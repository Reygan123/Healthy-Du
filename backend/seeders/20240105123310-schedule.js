'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Schedules', [{
      course_id: 1,
      week_id: 1,
      program_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      course_id: 1,
      week_id: 2,
      program_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      course_id: 1,
      week_id: 3,
      program_id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      course_id: 1,
      week_id: 4,
      program_id: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    {
      course_id: 2,
      week_id: 1,
      program_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      course_id: 2,
      week_id: 2,
      program_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      course_id: 2,
      week_id: 3,
      program_id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      course_id: 2,
      week_id: 4,
      program_id: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Schedules', null, {});
  }
};
