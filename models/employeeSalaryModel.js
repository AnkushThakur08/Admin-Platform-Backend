const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConnection").sequelize;

const employeeSalary = sequelize.define(
  "employeeSalary",
  {
    esId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    salaryType: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: "salary",
        key: "salaryType",
      },
    },
    employeeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: "Employee",
        key: "Empid",
      },
    },
    empEduId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: "employeeEdu",
        key: "eEduId",
      },
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
  }
);

module.exports = employeeSalary;
