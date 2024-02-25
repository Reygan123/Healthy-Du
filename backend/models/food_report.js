'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food_Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Food_Report.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Food_Report.belongsTo(models.Meal_Schedule, {
        foreignKey: "meal_id",
      });
      Food_Report.belongsTo(models.Food, {
        foreignKey: "food_id",
      });
    }
  }
  Food_Report.init({
    user_id: DataTypes.INTEGER,
    meal_id: DataTypes.INTEGER,
    food_id: DataTypes.INTEGER,
    date: DataTypes.DATE,
    amount: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Food_Report',
  });
  return Food_Report;
};