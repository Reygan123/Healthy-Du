'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      username: 'reygan',
      name: 'Reygan Fadhilah',
      email: 'reygan@gmail.com',
      password: 'reygan',
      age: 20,
      role: 'admin',
      gender: 'Laki-Laki',
      height: 175,
      weight: 75,
      point: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'faiz',
      name: 'faiz',
      email: 'Faiz@gmail.com',
      password: 'faiz',
      age: 21,
      role: 'admin',
      gender: 'Laki-Laki',
      height: 165,
      weight: 65,
      point: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
