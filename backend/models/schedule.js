'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Schedule.belongsTo(models.Program, {
        foreignKey: "program_id",
      });
      Schedule.belongsTo(models.Course, {
        foreignKey: "course_id",
      });
      Schedule.belongsTo(models.Week, {
        foreignKey: "week_id",
      });
    }
  }
  Schedule.init({
    course_id: DataTypes.INTEGER,
    program_id: DataTypes.INTEGER,
    week_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};