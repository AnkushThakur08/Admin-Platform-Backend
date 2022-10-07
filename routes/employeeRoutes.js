const express = require("express");
const router = express.Router();

// Validation
const { check, body, validationResult } = require("express-validator");

// const loginController = require("../controllers/loginController");
const Controller = require("../controllers/index");
const sendRespose = require("../helper/sendResponse");

router.post("/addEmployee", (req, res) => {
  return sendRespose.executeMethod(
    Controller.employeeController.addEmployee,
    req.body,
    req,
    res
  );
});

router.get("/userDetails", (req, res) => {
  return sendRespose.executeMethod(
    Controller.employeeController.userDetails,
    req.body,
    req,
    res
  );
});

module.exports = router;

// [
//   check("email").isEmail(),
//   check("name")
//     .isLength({ min: 3 })
//     .trim()
//     .custom((value) => {
//       return value.match(/^[A-Za-z ]+$/);
//     })
//     .withMessage("Name must have 3 Alphabet Characters"),

//   check("gender")
//     .isIn(["Male", "Female", "Other"])
//     .withMessage("Gender Must be Male/Female/Others"),

//   check("address")
//     .isLength({ min: 4 })
//     .trim()
//     .custom((value) => {
//       return value.match(/^[A-Za-z ]+$/);
//     })
//     .withMessage("Address must have 3 Characters"),
// ],
