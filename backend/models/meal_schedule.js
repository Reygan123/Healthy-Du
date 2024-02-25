'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meal_Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Meal_Schedule.belongsToMany(models.Food, {
        through: models.Food_Report,
        foreignKey: "meal_id",
      });
      Meal_Schedule.hasMany(models.Food_Report, { foreignKey: "meal_id" });
      Meal_Schedule.belongsToMany(models.User, {
        through: models.Food_Report,
        foreignKey: "meal_id",
      });
      Meal_Schedule.hasMany(models.Food_Report, { foreignKey: "meal_id" });
    }
  }
  Meal_Schedule.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Meal_Schedule',
  });
  return Meal_Schedule;
};