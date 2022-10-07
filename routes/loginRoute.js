const express = require("express");
const router = express.Router();

// Validation
const { check, body, validationResult } = require("express-validator");

// const loginController = require("../controllers/loginController");
const Controller = require("../controllers/index");
const sendRespose = require("../helper/sendResponse");

router.post(
  "/registration",
  [
    check("name")
      .isLength({ min: 4 })
      .trim()
      .custom((value) => {
        return value.match(/^[A-Za-z ]+$/);
      })
      .withMessage("Name must have 3 Alphabet Characters"),

    check("email").isEmail().optional(),

    check("password")
      .isLength({ min: 4 })
      .withMessage("Password should be atleast of 4 Characters"),
  ],

  (req, res) => {
    // console.log(req);
    return sendRespose.executeMethod(
      Controller.loginControllers.registration,
      req.body,
      req,
      res
    );
  }
);

router.post("/login", (req, res) => {
  return sendRespose.executeMethod(
    Controller.loginControllers.login,
    req.body,
    req,
    res
  );
});

// Password RESET
router.post("/sendResetPasswordMail", (req, res) => {
  return sendRespose.executeMethod(
    Controller.loginControllers.sendResetPasswordMail,
    req.body,
    req,
    res
  );
});

router.post("/changePassword", (req, res) => {
  return sendRespose.executeMethod(
    Controller.loginControllers.changePassword,
    req.body,
    req,
    res
  );
});



module.exports = router;
