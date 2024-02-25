'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Food.belongsToMany(models.Meal_Schedule, {
        through: models.Food_Report,
        foreignKey: "food_id",
      });
      Food.hasMany(models.Food_Report, { foreignKey: "food_id" });
      Food.belongsToMany(models.User, {
        through: models.Food_Report,
        foreignKey: "food_id",
      });
      Food.hasMany(models.Food_Report, { foreignKey: "food_id" });
    }
  }
  Food.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    calories: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { notEmpty: true },
    },
    serving_size: {
      type: DataTypes.FLOAT,
    },
    serving_plate: {
      type: DataTypes.FLOAT,
    },
    serving_bowl: {
      type: DataTypes.FLOAT,
    },
    piece: {
      type: DataTypes.FLOAT,
    },
    fat: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { notEmpty: true },
    },
    cholesterol: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { notEmpty: true },
    },
    protein: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { notEmpty: true },
    },
    carbohydrate: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { notEmpty: true },
    },
    sodium: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { notEmpty: true },
    },
    kalium: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: { notEmpty: true },
    },
  }, {
    sequelize,
    modelName: 'Food',
  });
  return Food;
};