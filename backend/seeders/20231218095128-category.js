'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [{
      id: 901,
      name: 'Bahu',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 902,
      name: 'Betis',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 903,
      name: 'Dada',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 904,
      name: 'Paha',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 905,
      name: 'Tricep',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 906,
      name: 'Bicep',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 907,
      name: 'Otot Bokong',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 908,
      name: 'Punggung',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 909,
      name: 'Kaki',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 910,
      name: 'Seluruh Tubuh',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 911,
      name: 'Pinggul',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 912,
      name: 'Perut',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 913,
      name: 'Otot Paha Belakang',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
