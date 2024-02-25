'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Exercise.belongsToMany(models.Program, {
        through: models.Program_Exercise,
        foreignKey: "exercise_id",
      });
      Exercise.hasMany(models.Program_Exercise, { foreignKey: "exercise_id" });
      Exercise.belongsToMany(models.Category, {
        through: models.Exercise_Category,
        foreignKey: "exercise_id",
      });
      Exercise.hasMany(models.Exercise_Category, { foreignKey: "exercise_id" });
    }
  }
  Exercise.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    repetition_time: DataTypes.INTEGER,
    repetition_value: DataTypes.INTEGER,
    level: DataTypes.STRING,
    calories: DataTypes.INTEGER,
    link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Exercise',
  });
  return Exercise;
};