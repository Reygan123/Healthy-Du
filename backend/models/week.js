'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Week extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Week.belongsToMany(models.Course, {
        through: models.Schedule,
        foreignKey: "week_id",
      });
      Week.hasMany(models.Schedule, { foreignKey: "week_id" });
      Week.belongsToMany(models.Program, {
        through: models.Schedule,
        foreignKey: "week_id",
      });
      Week.hasMany(models.Schedule, { foreignKey: "week_id" });
    }
  }
  Week.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Week',
  });
  return Week;
};