"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../utils/BcryptUtil");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Food, {
        through: models.Food_Report,
        foreignKey: "user_id",
      });
      User.hasMany(models.Food_Report, { foreignKey: "user_id" });
      User.belongsToMany(models.Program, {
        through: models.Status_Program,
        foreignKey: "user_id",
      });
      User.hasMany(models.Status_Program, { foreignKey: "user_id" });
      User.belongsToMany(models.Meal_Schedule, {
        through: models.Food_Report,
        foreignKey: "user_id",
      });
      User.hasMany(models.Food_Report, { foreignKey: "user_id" });
      User.belongsToMany(models.Course, {
        through: models.Joined_Course,
        foreignKey: "user_id",
      });
      User.hasMany(models.Joined_Course, { foreignKey: "user_id" });
      User.hasMany(models.Exercise_Report, { foreignKey: 'user_id' });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { notEmpty: true },
      },
      age: DataTypes.INTEGER,
      role: DataTypes.STRING,
      gender: DataTypes.STRING,
      weight: DataTypes.INTEGER,
      height: DataTypes.INTEGER,
      activity_factor: DataTypes.FLOAT,
      point: DataTypes.INTEGER
    },
    {
      hooks: {
        beforeUpdate: async (user, option) => {
          const hashedPassword = await hashPassword(user.password);
          user.password = hashedPassword;
        },
        beforeCreate: async (user, option) => {
          const hashedPassword = await hashPassword(user.password);
          user.password = hashedPassword;
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
