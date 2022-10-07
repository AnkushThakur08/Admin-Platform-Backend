const Model = require("../models/index");
const { Op } = require("sequelize");

exports.createData = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    Model.EmployeeEducationModel.create(data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Find data", error);
      });
  });
};

exports.findByEmpIdAndEduName = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    Model.EmployeeEducationModel.findOne({
      where: {
        [Op.and]: [{ employeeId: data.employeeId }, { eduName: data.eduName }],
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
