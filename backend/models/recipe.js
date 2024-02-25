'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recipe.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    time_prepare: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notEmpty: true },
    },
    time_cooking: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { notEmpty: true },
    },
    tutorial: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};