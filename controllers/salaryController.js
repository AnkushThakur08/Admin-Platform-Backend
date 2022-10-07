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
  addSalary: async (data, req, res) => {
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
      salaryType: data.salaryType,
      minSalary: data.minSalary,
      maxSalary: data.maxSalary,
    };

    console.log("USERDATA", userData);

    let findData = await Service.salaryService.findBySalaryType(userData);
    if (!findData) {
      let createDepartment = await Service.salaryService.addSalary(userData);
      return {
        status: 200,
        message: "Salary Level Added Successfully!!",
        department: createDepartment,
      };
    } else {
      return {
        status: 400,
        message: "Salary Level Already Exists!!",
      };
    }
  },

  getSalary: async (data) => {
    const user = await Service.salaryService.getSalary(data);
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

  getIndividualSalary: async (data, req, res) => {
    const userData = {
      salaryId: req.params.salaryId,
    };
    const user = await Service.salaryService.getIndividualSalary(userData);
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

  updateSalaryRange: async (data, req, res) => {
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
      minSalary: req.body.minSalary,
      maxSalary: req.body.maxSalary,
      salaryId: data.salaryId,
    };

    console.log(userData);

    const user = await Service.salaryService.findById(userData);
    if (user) {
      const users = await Service.salaryService.updateSalaryRange(userData);

      return {
        status: 200,
        message: "Salary Range updated Successfully",
        user: userData,
      };
    } else {
      return {
        status: 400,
        message: "Salary Range Does not exist",
      };
    }
  },

  blockSalary: async (data, req, res) => {
    let userData = {
      salaryId: data.salaryId,
    };
    const education = await Service.salaryService.findById(userData);
    if (education.isBlocked === 0) {
      let blockEducation = await Service.salaryService.blockSalary(userData);
      return {
        status: 200,
        message: "Successfully blocked the Salary",
        user: blockEducation,
      };
    } else {
      let unblockEducation = await Service.salaryService.UnblockSalary(
        userData
      );
      return {
        status: 201,
        message: "Successfully Unblock the Salary",
        user: unblockEducation,
      };
    }
  },

  filterSalary: async (payloadData) => {
    const schema = Joi.object().keys({
      limit: Joi.number().optional(),
      skip: Joi.number().optional(),
      sortBy: Joi.string().optional(),
      orderBy: Joi.string().optional(),
      search: Joi.string().optional().allow(""),
      isBlocked: Joi.number().optional().allow(""),
      minSalary: Joi.string().optional().allow(""),
      maxSalary: Joi.string().optional().allow(""),
    });
    let payload = await Helper.verifyjoiSchema(payloadData, schema);
    let education = await Service.salaryService.filterSalary(
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

  // TODO: ASSOCIATION

  getSalaryDetails: async (data) => {
    let salaryDeatil = await Service.salaryService.getSalaryDetails();
    if (salaryDeatil) {
      return {
        status: 200,
        message: "salaryDeatil Get Successfully",
        notification: salaryDeatil,
      };
    } else {
      return {
        rows: [],
        count: 0,
      };
    }
  },

  getIndividualSalaryDetails: async (data, req, res) => {
    const userData = {
      salaryId: req.params.salaryId,
    };

    let salaryDeatil = await Service.salaryService.getIndividualSalaryDetails(
      userData
    );
    if (salaryDeatil) {
      return {
        status: 200,
        message: "salaryDeatil Get Successfully",
        notification: salaryDeatil,
      };
    } else {
      return {
        rows: [],
        count: 0,
      };
    }
  },

  getCombineSalaryDetails: async (data, req, res) => {
    let salaryDeatil = await Service.salaryService.getCombineSalaryDetails(
      data
    );
    if (salaryDeatil) {
      return {
        status: 200,
        message: "salaryDeatil Get Successfully",
        notification: salaryDeatil,
      };
    } else {
      return {
        rows: [],
        count: 0,
      };
    }
  },
};
