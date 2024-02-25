'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status_Program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Status_Program.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Status_Program.belongsTo(models.Program, {
        foreignKey: "program_id",
      });
    }
  }
  Status_Program.init({
    user_id: DataTypes.INTEGER,
    program_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Status_Program',
  });
  return Status_Program;
};