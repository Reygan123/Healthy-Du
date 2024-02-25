'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Program_Exercise extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Program_Exercise.belongsTo(models.Program, {
        foreignKey: "program_id",
      });
      Program_Exercise.belongsTo(models.Exercise, {
        foreignKey: "exercise_id",
      });
    }
  }
  Program_Exercise.init({
    exercise_id: DataTypes.INTEGER,
    program_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Program_Exercise',
  });
  return Program_Exercise;
};