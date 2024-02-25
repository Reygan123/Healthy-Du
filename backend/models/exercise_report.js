'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise_Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Exercise_Report.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Exercise_Report.init({
    user_id: DataTypes.INTEGER,
    total_exercise: DataTypes.INTEGER,
    total_time: DataTypes.INTEGER,
    total_calories: DataTypes.INTEGER,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Exercise_Report',
  });
  return Exercise_Report;
};