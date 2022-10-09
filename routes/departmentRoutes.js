const express = require("express");
const router = express.Router();

// Validation
const { check, body, validationResult } = require("express-validator");

// const loginController = require("../controllers/loginController");
const Controller = require("../controllers/index");
const sendRespose = require("../helper/sendResponse");

router.post(
  "/addDepartment",
  [
    check("DeptName")
      .isLength({ min: 2 })
      .trim()
      .custom((value) => {
        return value.match(/^[A-Za-z ]+$/);
      })
      .withMessage("Name must have 2 Alphabet Characters"),

    check("salaryType")
      .isIn(["Level-1", "Level-2", "Level-3"])

      .withMessage("It should be in Level-1, Level-2, Level-3"),
  ],

  (req, res) => {
    return sendRespose.executeMethod(
      Controller.departmentController.addDepartment,
      req.body,
      req,
      res
    );
  }
);

router.get("/getDepartment", (req, res) => {
  return sendRespose.executeMethod(
    Controller.departmentController.getDepartment,
    req.body,
    req,
    res
  );
});

router.get("/getBlockedDepartment", (req, res) => {
  return sendRespose.executeMethod(
    Controller.departmentController.getBlockedDepartment,
    req.body,
    req,
    res
  );
});

router.post(
  "/updateDepartment/:deptId",
  [
    check("DeptName")
      .isLength({ min: 2 })
      .trim()
      .custom((value) => {
        return value.match(/^[A-Za-z ]+$/);
      })
      .withMessage("Name must have 2 Alphabet Characters"),
  ],

  (req, res) => {
    return sendRespose.executeMethod(
      Controller.departmentController.updateDepartment,
      req.params,
      req,
      res
    );
  }
);

router.post("/blockDepartment/:deptId", (req, res) => {
  return sendRespose.executeMethod(
    Controller.departmentController.blockDepartment,
    req.params,
    req,
    res
  );
});

router.get("/filterDepartment", (req, res) => {
  let payload = req.query; /* Value of BLOCK */

  /* FOR TABLE */
  if (payload.skip && payload.limit && payload.skip > 0) {
    payload.skip = (payload.skip - 1) * payload.limit;
  }
  return sendRespose.executeMethod(
    Controller.departmentController.filterDepartment,
    payload,
    req,
    res
  );
});


router.get("/getSalaryLevel1", (req, res) => {
  return sendRespose.executeMethod(
    Controller.departmentController.getSalaryLevel1,
    req.body,
    req,
    res
  );
});

router.get("/getSalaryLevel2", (req, res) => {
  return sendRespose.executeMethod(
    Controller.departmentController.getSalaryLevel2,
    req.body,
    req,
    res
  );
});

router.get("/getSalaryLevel3", (req, res) => {
  return sendRespose.executeMethod(
    Controller.departmentController.getSalaryLevel3,
    req.body,
    req,
    res
  );
});


//FIXME: Chart
router.get("/getDepartmentDetailsByChart", (req, res) => {
  return sendRespose.executeMethod(
    Controller.departmentController.getDepartmentDetailsByChart,
    req.body,
    req,
    res
  );
});

router.get("/getDepartmentSalary", (req, res) => {
  return sendRespose.executeMethod(
    Controller.departmentController.getDepartmentSalary,
    req.body,
    req,
    res
  );
});

module.exports = router;
