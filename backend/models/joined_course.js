'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Joined_Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Joined_Course.belongsTo(models.User, { foreignKey: "user_id" });
      Joined_Course.belongsTo(models.Course, { foreignKey: "course_id" });
    }
  }
  Joined_Course.init({
    user_id: DataTypes.INTEGER,
    course_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Joined_Course',
  });
  return Joined_Course;
};