const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../dbConnection").sequelize;

const Employee = sequelize.define(
  "Employee",
  {
    Empid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    email: {
      type: DataTypes.STRING,
      trim: true,
      defaultValue: 0,
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: 0,
    },
    DOB: {
      type: DataTypes.DATE,
    },
    DateOfJoining: {
      type: DataTypes.DATE,
    },
    Isblocked: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    gender: {
      type: DataTypes.STRING,
      // defaultValue: 0,
    },

    address: {
      type: DataTypes.STRING,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
  }
);

module.exports = Employee;
