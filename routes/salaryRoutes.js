const express = require("express");
const router = express.Router();

// Validation
const { check, body, validationResult } = require("express-validator");

// const loginController = require("../controllers/loginController");
const Controller = require("../controllers/index");
const sendRespose = require("../helper/sendResponse");

router.post(
  "/addSalary",
  [
    check("salaryType")
      .isIn(["Level-1", "Level-2", "Level-3"])

      .withMessage("Salary Must be in Levels"),

    check("minSalary").isNumeric().withMessage("Salary must be in Numeric"),
    check("maxSalary").isNumeric().withMessage("Salary must be in Numeric"),
  ],

  (req, res) => {
    return sendRespose.executeMethod(
      Controller.salaryController.addSalary,
      req.body,
      req,
      res
    );
  }
);

router.get("/getSalary", (req, res) => {
  return sendRespose.executeMethod(
    Controller.salaryController.getSalary,
    req.body,
    req,
    res
  );
});

router.get("/getIndividualSalary/:salaryId", (req, res) => {
  return sendRespose.executeMethod(
    Controller.salaryController.getIndividualSalary,
    req.body,
    req,
    res
  );
});

router.put(
  "/updateSalaryRange/:salaryId",
  [
    check("salaryType")
      .isIn(["Level-1", "Level-2", "Level-3"])

      .withMessage("It should be Level-1, Level-2, Level-3"),

    check("minSalary").isInt([{min: 1000, max:1000000}]).withMessage("Salary must be in Numeric"),
    check("maxSalary").isInt([{min: 1000, max:1000000}]).withMessage("Salary must be in Numeric"),
  ],

  (req, res) => {
    return sendRespose.executeMethod(
      Controller.salaryController.updateSalaryRange,
      req.params,
      req,
      res
    );
  }
);

router.put("/blockSalary/:salaryId", (req, res) => {
  return sendRespose.executeMethod(
    Controller.salaryController.blockSalary,
    req.params,
    req,
    res
  );
});

router.get("/filterSalary", (req, res) => {
  let payload = req.query; /* Value of BLOCK */

  /* FOR TABLE */
  if (payload.skip && payload.limit && payload.skip > 0) {
    payload.skip = (payload.skip - 1) * payload.limit;
  }
  return sendRespose.executeMethod(
    Controller.salaryController.filterSalary,
    payload,
    req,
    res
  );
});

// ASSOCATION
router.get("/getSalaryDetails", (req, res) => {
  return sendRespose.executeMethod(
    Controller.salaryController.getSalaryDetails,
    req.body,
    req,
    res
  );
});

router.get("/getIndividualSalaryDetails/:salaryId", (req, res) => {
  return sendRespose.executeMethod(
    Controller.salaryController.getIndividualSalaryDetails,
    req.body,
    req,
    res
  );
});

router.get("/getCombineSalaryDetails", (req, res) => {
  return sendRespose.executeMethod(
    Controller.salaryController.getCombineSalaryDetails,
    req.body,
    req,
    res
  );
});

module.exports = router;
