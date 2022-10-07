const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConnection").sequelize;

const employeedepartment = sequelize.define(
  "employeeDept",
  {
    edId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    DeptName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    deptId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: "department",
        key: "deptId",
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
  },
  {
    freezeTableName: true,
    paranoid: true,
  }
);

module.exports = employeedepartment;
