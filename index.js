require("dotenv").config();
const express = require("express");
const app = express();
const port = 8000;

// Parser
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Body Parser & Cookier Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// My Routes
const loginRoutes = require("./routes/loginRoute");
const educationRoutes = require("./routes/educationRoute");
const departmentRoutes = require("./routes/departmentRoutes");
const salaryRoutes = require("./routes/salaryRoutes");
const employeeRoute = require("./routes/employeeRoutes");

// DataBase Connection
require("./dbConnection").connect();
require("./dbConnection").syn();

// Model Connection
require("./models/index");

// Routes Middleware
app.use("/api", loginRoutes);
app.use("/api", educationRoutes);
app.use("/api", departmentRoutes);
app.use("/api", salaryRoutes);
app.use("/api", employeeRoute);

// LISTENING
app.listen(port, (req, res) => {
  console.log(`App listening on port ${port}`);
});
