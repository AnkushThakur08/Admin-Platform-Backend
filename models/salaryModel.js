const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../dbConnection").sequelize;

const salary = sequelize.define(
  "salary",
  {
    salaryId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      // primaryKey: true,
    },

    salaryType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
      primaryKey: true,
    },

    minSalary: {
      type: DataTypes.STRING,
      allowNull: true,
      // defaultValue: 0,
    },

    maxSalary: {
      type: DataTypes.STRING,
      allowNull: true,
      //   defaultValue: 0,
    },

    isBlocked: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
  }
);

module.exports = salary;
