const Model = require("../models/index");
const { Op } = require("sequelize");

exports.createData = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    Model.employeeSalaryModel
      .create(data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Find data", error);
      });
  });
};

exports.findByEmpIdAndSalaryType = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    Model.employeeSalaryModel
      .findOne({
        where: {
          [Op.and]: [
            { employeeId: data.employeeId },
            { salaryType: data.salaryType },
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
