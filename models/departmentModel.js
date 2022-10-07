const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../dbConnection").sequelize;

const department = sequelize.define(
  "department",
  {
    deptId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    DeptName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    isBlocked: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },

    salaryType: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "salary",
        key: "salaryType",
      },
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
  }
);

module.exports = department;
