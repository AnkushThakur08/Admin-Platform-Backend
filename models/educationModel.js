const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../dbConnection").sequelize;

const education = sequelize.define(
  "education",
  {
    eduId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    eduName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isBlocked: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    paranoid: true,
  }
);

module.exports = education;
