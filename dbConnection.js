const Sequelize = require("sequelize");
const env = require("./config/env")();

// Sequelize
const sequelize = new Sequelize(
  env.DATABASE.name,
  env.DATABASE.user,
  env.DATABASE.password,
  {
    host: env.DATABASE.host,
    dialect: "mysql",
    logging: false,
  }
);

// Connection
// var connectDB = () => {
//   sequelize
//     .authenticate()
//     .then(() => {
//       sequelize.sync({ alter: true });
//       console.log("Connection and Synchronization Successfully!!");
//     })
//     .catch((error) => {
//       console.error("Unable to connect the Database: " + error);
//     });
// };

// module.exports = {
//   connectDB: connectDB,
//   sequelize: sequelize,
// };

const connect = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connected with database");
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

const syn = () => {
  sequelize.sync({ alter: true }).then(() => {
    console.log("Sync");
  });
};

module.exports = { sequelize: sequelize, connect: connect, syn: syn };
