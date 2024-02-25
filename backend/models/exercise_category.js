'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exercise_Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Exercise_Category.belongsTo(models.Exercise, { foreignKey: "exercise_id" });
      Exercise_Category.belongsTo(models.Category, { foreignKey: "category_id" });
    }
  }
  Exercise_Category.init({
    exercise_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Exercise_Category',
  });
  return Exercise_Category;
};