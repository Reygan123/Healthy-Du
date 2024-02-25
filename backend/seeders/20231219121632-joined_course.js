'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Joined_Courses', [{
      user_id: 1,
      course_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      user_id: 2,
      course_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Joined_Courses', null, {});
  }
};
