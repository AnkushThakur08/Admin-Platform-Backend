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
  addDepartment: async (data, req, res) => {
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
      DeptName: data.DeptName,
      salaryType: data.salaryType,
    };

    console.log("USERDATA", userData);

    let findData = await Service.departmentService.findByName(userData);
    if (!findData) {
      let createDepartment = await Service.departmentService.addDepartment(
        userData
      );
      return {
        status: 200,
        message: "Department Added Successfully!!",
        department: createDepartment,
      };
    } else {
      return {
        status: 400,
        message: "Department Already Exists!!",
      };
    }
  },

  getDepartment: async (data) => {
    const user = await Service.departmentService.getDepartment(data);
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

  getBlockedDepartment: async (data) => {
    const user = await Service.departmentService.getBlockedDepartment(data);
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

  getSalaryLevel1: async (data) => {
    const user = await Service.departmentService.getDepartmentSalary(data);
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

  getSalaryLevel2: async (data) => {
    const user = await Service.departmentService.getDepartmentSalary2(data);
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

  getSalaryLevel3: async (data) => {
    const user = await Service.departmentService.getDepartmentSalary3(data);
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


  updateDepartment: async (data, req, res) => {
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
      DeptName: req.body.DeptName,
      deptId: data.deptId,
    };

    console.log(userData);

    const user = await Service.departmentService.findById(userData);
    if (user) {
      const users = await Service.departmentService.updateDepartment(userData);

      return {
        status: 200,
        message: "Department updated",
        user: userData,
      };
    } else {
      return {
        status: 400,
        message: "Department Does not exist",
      };
    }
  },

  blockDepartment: async (data, req, res) => {
    let userData = {
      deptId: data.deptId,
    };
    const education = await Service.departmentService.findById(userData);
    if (education.isBlocked === 0) {
      let blockEducation = await Service.departmentService.blockDepartment(
        userData
      );
      return {
        status: 200,
        message: "Successfully blocked the Department",
        user: blockEducation,
      };
    } else {
      let unblockEducation = await Service.departmentService.unblockDepartment(
        userData
      );
      return {
        status: 201,
        message: "Successfully Unblock the qualification",
        user: unblockEducation,
      };
    }
  },

  filterDepartment: async (payloadData) => {
    const schema = Joi.object().keys({
      limit: Joi.number().optional(),
      skip: Joi.number().optional(),
      sortBy: Joi.string().optional(),
      orderBy: Joi.string().optional(),
      search: Joi.string().optional().allow(""),
      isBlocked: Joi.number().optional().allow(""),
    });
    let payload = await Helper.verifyjoiSchema(payloadData, schema);
    let education = await Service.departmentService.filterDepartment(
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

  // FIXME:
  getDepartmentDetailsByChart: async (d, req, res) => {
    let userBlockedCount = await Service.departmentService.getDatasBlocked();
    let BlockCount = userBlockedCount.count;
    let userUnBlockedCount = await Service.departmentService.getDatasUnblock();
    let UnblockCount = userUnBlockedCount.count;
    let blockUnblockTotal = await Service.departmentService.getDatasall();
    let total = blockUnblockTotal.count;
    return {
      BlockCount: BlockCount,
      UnblockCount: UnblockCount,
      blockUnblockTotal: total,
    };
  },

  getDepartmentSalary: async (data) => {
    const user = await Service.departmentService.getDepartmentSalary(data);
    const countBySalaryLevel1 = user.count;
    const count1 = user.countBySalaryLevel1;

    const user1 = await Service.departmentService.getDepartmentSalary2(data);
    const countBySalaryLevel2 = user1.count;

    const user2 = await Service.departmentService.getDepartmentSalary3(data);
    const countBySalaryLevel3 = user2.count;

    return {
      status: 200,
      countBySalaryLevel1: countBySalaryLevel1,
      countBySalaryLevel2: countBySalaryLevel2,
      countBySalaryLevel3: countBySalaryLevel3,
    };
  },
};
