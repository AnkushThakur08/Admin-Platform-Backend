const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../dbConnection").sequelize;

const common = sequelize.define(
  "common",
  {
    commonId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
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

    DeptName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    eduName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // deptId: {
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4,
    //   allowNull: true,
    //   references: {
    //     model: "department",
    //     key: "deptId",
    //   },
    // },

    eduId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true,
      references: {
        model: "education",
        key: "eduId",
      },
    },

    // salaryId: {
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4,
    //   allowNull: true,
    //   references: {
    //     model: "salary",
    //     key: "salaryId",
    //   },
    // },
  },
  {
    freezeTableName: true,
    paranoid: true,
  }
);

module.exports = common;
