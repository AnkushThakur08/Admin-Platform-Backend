const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../dbConnection").sequelize;

const User = sequelize.define(
  "User",
  {
    id: {
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
      defaultValue: 0,
    },

    password: {
      type: DataTypes.STRING,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
    deletedAt: "destroyTime",
    paranoid: true,
  }
);

module.exports = User;
