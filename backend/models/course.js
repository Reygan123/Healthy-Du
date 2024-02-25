'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.belongsToMany(models.Program, {
        through: models.Schedule,
        foreignKey: "course_id",
      });
      Course.hasMany(models.Schedule, { foreignKey: "course_id" });
      Course.belongsToMany(models.Week, {
        through: models.Schedule,
        foreignKey: "course_id",
      });
      Course.hasMany(models.Schedule, { foreignKey: "course_id" });
      Course.belongsToMany(models.User, {
        through: models.Joined_Course,
        foreignKey: "course_id",
      });
      Course.hasMany(models.Joined_Course, { foreignKey: "course_id" });
    }
  }
  Course.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};