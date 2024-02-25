'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Food', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        unique: true
      },
      calories: {
        type: Sequelize.FLOAT
      },
      serving_size: {
        type: Sequelize.FLOAT
      },
      serving_plate: {
        type: Sequelize.FLOAT
      },
      serving_bowl: {
        type: Sequelize.FLOAT
      },
      piece: {
        type: Sequelize.FLOAT
      },
      fat: {
        type: Sequelize.FLOAT
      },
      cholesterol: {
        type: Sequelize.FLOAT
      },
      protein: {
        type: Sequelize.FLOAT
      },
      carbohydrate: {
        type: Sequelize.FLOAT
      },
      sodium: {
        type: Sequelize.FLOAT
      },
      kalium: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Food');
  }
};