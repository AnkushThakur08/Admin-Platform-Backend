const Model = require("../models/index");
const { Op } = require("sequelize");

exports.createData = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    Model.EmployeeDepartmentModel.create(data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Find data", error);
      });
  });
};
exports.findByEmpIdAndName = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    Model.EmployeeDepartmentModel.findOne({
      where: {
        [Op.and]: [
          { employeeId: data.employeeId },
          { DeptName: data.DeptName },
        ],
      },
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Find data", error);
      });
  });
};
