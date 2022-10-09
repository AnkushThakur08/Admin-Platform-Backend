// DOTENV
require("dotenv").config();

// Express-Validator
const { check, body, validationResult } = require("express-validator");

// Services
const Service = require("../services");

// JOI
const Helper = require("../helper/validator");

const Joi = require("joi");

module.exports = {
  addEducation: async (data, req, res) => {
    // VALIDATION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return {
        status: 400,
        message: errors.array()[0].msg + " in " + errors.array()[0].param,
        // parameter: errors.array()[0].param,
      };
    }
    const userData = {
      eduName: data.eduName,
    };

    console.log("USERDATA", userData);

    let findData = await Service.educationService.findByName(userData);
    if (!findData) {
      let createDepartment = await Service.educationService.addEducation(
        userData
      );
      return {
        status: 200,
        message: "Education Qualification Added Successfully!!",
        department: createDepartment,
      };
    } else {
      return {
        status: 400,
        message: "Education Qualification Already Exists!!",
      };
    }
  },

  getEducationQualification: async (data) => {
    const user = await Service.educationService.getEducationQualification(data);
    if (user) {
      return {
        status: 200,
        user: user,
      };
    } else {
      return {
        status: 400,
        message: "No Record Found",
      };
    }
  },

  getIndividualEducationQualification: async (data) => {
    const user = await Service.educationService.getIndividualEducationQualification(data);
    if (user) {
      return {
        status: 200,
        user: user,
      };
    } else {
      return {
        status: 400,
        message: "No Record Found",
      };
    }
  },

  updateEducationQualification: async (data, req, res) => {
    // VALIDATION
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return {
        status: 400,
        message: errors.array()[0].msg + " in " + errors.array()[0].param,
        // parameter: errors.array()[0].param,
      };
    }

    const userData = {
      eduName: req.body.eduName,
      eduId: data.eduId,
    };

    console.log(userData);

    const user = await Service.educationService.findById(userData);
    if (user) {
      const users = await Service.educationService.updateEducationQualification(
        userData
      );

      return {
        status: 200,
        message: "Education Qualification updated",
        user: userData,
      };
    } else {
      return {
        status: 400,
        message: "Education Qualification Does not exist",
      };
    }
  },

  blockEducationQualification: async (data, req, res) => {
    let userData = {
      eduId: data.eduId,
    };
    const education = await Service.educationService.findById(userData);
    if (education.isBlocked === 0) {
      let blockEducation =
        await Service.educationService.blockEducationQualification(userData);
      return {
        status: 200,
        message: "Successfully blocked the Education qualification",
        user: blockEducation,
      };
    } else {
      let unblockEducation =
        await Service.educationService.UnblockEducationQualification(userData);
      return {
        status: 201,
        message: "Successfully Unblock the qualification",
        user: unblockEducation,
      };
    }
  },

  // filterUser: async (payloadData) => {
  //   console.log(payloadData); /* isblocked value */
  //   let education = await Service.educationService.filterUser(payloadData);
  //   if (education) {
  //     return education;
  //   } else {
  //     return {
  //       rows: [],
  //       count: 0,
  //     };
  //   }
  // },

  filterUser: async (payloadData) => {
    const schema = Joi.object().keys({
      limit: Joi.number().optional(),
      skip: Joi.number().optional(),
      sortBy: Joi.string().optional(),
      orderBy: Joi.string().optional(),
      search: Joi.string().optional().allow(""),
      isBlocked: Joi.number().optional().allow(""),
    });
    let payload = await Helper.verifyjoiSchema(payloadData, schema);
    let education = await Service.educationService.filterUser(
      payload,
      parseInt(payload.limit, 10) || 10,
      parseInt(payload.skip, 10) || 0
    );
    if (education) {
      return education;
    } else {
      return {
        rows: [],
        count: 0,
      };
    }
  },

  // TODO:CHART
  getEducationDetailsByChart: async (d, req, res) => {
    let userBlockedCount = await Service.educationService.getDatasBlocked();
    let BlockCount = userBlockedCount.count;
    let userUnBlockedCount = await Service.educationService.getDatasUnblock();
    let UnblockCount = userUnBlockedCount.count;
    let blockUnblockTotal = await Service.educationService.getDatasall();
    let total = blockUnblockTotal.count;
    return {
      BlockCount: BlockCount,
      UnblockCount: UnblockCount,
      blockUnblockTotal: total,
    };
  },
};
