'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Program.belongsToMany(models.Exercise, {
        through: models.Program_Exercise,
        foreignKey: "program_id",
      });
      Program.hasMany(models.Program_Exercise, { foreignKey: "program_id" });
      Program.belongsToMany(models.Course, {
        through: models.Schedule,
        foreignKey: "program_id",
      });
      Program.hasMany(models.Schedule, { foreignKey: "program_id" });
      Program.belongsToMany(models.Week, {
        through: models.Schedule,
        foreignKey: "program_id",
      });
      Program.hasMany(models.Schedule, { foreignKey: "program_id" });
      Program.belongsToMany(models.User, {
        through: models.Status_Program,
        foreignKey: "program_id",
      });
      Program.hasMany(models.Status_Program, { foreignKey: "program_id" });
    }
  }
  Program.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Program',
  });
  return Program;
};