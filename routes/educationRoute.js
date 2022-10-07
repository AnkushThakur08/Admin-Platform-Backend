const express = require("express");
const router = express.Router();

// Validation
const { check, body, validationResult } = require("express-validator");

// const loginController = require("../controllers/loginController");
const Controller = require("../controllers/index");
const sendRespose = require("../helper/sendResponse");

router.post(
  "/addEducation",
  [
    check("eduName")
      .isLength({ min: 2 })
      .trim()
      .custom((value) => {
        return value.match(/^[A-Za-z ]+$/);
      })
      .withMessage("Name must have 2 Alphabet Characters"),
  ],

  (req, res) => {
    return sendRespose.executeMethod(
      Controller.educationController.addEducation,
      req.body,
      req,
      res
    );
  }
);

router.get("/getEducationQualification", (req, res) => {
  return sendRespose.executeMethod(
    Controller.educationController.getEducationQualification,
    req.body,
    req,
    res
  );
});

router.get("/getIndividualEducationQualification/:eduId", (req, res) => {
  return sendRespose.executeMethod(
    Controller.educationController.getIndividualEducationQualification,
    req.params,
    req,
    res
  );
});

router.post(
  "/updateEducationQualification/:eduId",
  [
    check("eduName")
      .isLength({ min: 1 })
      .trim()
      .custom((value) => {
        return value.match(/^[A-Za-z ]+$/);
      })
      .withMessage("Name must have 1 Alphabet Characters"),
  ],

  (req, res) => {
    return sendRespose.executeMethod(
      Controller.educationController.updateEducationQualification,
      req.params,
      req,
      res
    );
  }
);

router.post("/blockUser/:eduId", (req, res) => {
  return sendRespose.executeMethod(
    Controller.educationController.blockEducationQualification,
    req.params,
    req,
    res
  );
});

router.get("/filterUser", (req, res) => {
  let payload = req.query; /* Value of BLOCK */

  /* FOR TABLE */
  if (payload.skip && payload.limit && payload.skip > 0) {
    payload.skip = (payload.skip - 1) * payload.limit;
  }
  return sendRespose.executeMethod(
    Controller.educationController.filterUser,
    payload,
    req,
    res
  );
});

// router.get("/filterUser", (req, res) => {
//   let payload = req.query;

//   return sendRespose.executeMethod(
//     Controller.educationController.filterUser,
//     payload,
//     req,
//     res
//   );
// });

module.exports = router;
