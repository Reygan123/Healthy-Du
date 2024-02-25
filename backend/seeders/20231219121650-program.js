'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Programs', [{
      name: "Hari 1",
      description: "Lorem Ipsum Dolor Sir Amet",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Hari 2",
      description: "Lorem Ipsum Dolor Sir Amet",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Hari 3",
      description: "Lorem Ipsum Dolor Sir Amet",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Hari 4",
      description: "Lorem Ipsum Dolor Sir Amet",
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: "Hari 5",
      description: "Lorem Ipsum Dolor Sir Amet",
      createdAt: new Date(),
      updatedAt: new Date(),
    },], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Programs', null, {});
  }
};
