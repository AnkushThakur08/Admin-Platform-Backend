const Model = require("../models/index");
const { Op } = require("sequelize");

exports.findUserByEmail = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    Model.EmployeeModel.findOne({
      where: {
        email: data.email,
      },
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Find the User", error);
      });
  });
};

exports.addEmployee = (data) => {
  return new Promise((resolve, reject) => {
    Model.EmployeeModel.create(data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Register the User");
      });
  });
};

//-------------association----------------
Model.EmployeeModel.hasMany(Model.EmployeeDepartmentModel, {
  foreignKey: "employeeId",
});
Model.EmployeeDepartmentModel.hasMany(Model.EmployeeEducationModel, {
  foreignKey: "empdeptId",
});
Model.EmployeeEducationModel.hasMany(Model.employeeSalaryModel, {
  foreignKey: "empEduId",
});

exports.userDetails = () => {
  return new Promise((resolve, reject) => {
    Model.EmployeeModel.findAll({
      include: [
        {
          model: Model.EmployeeDepartmentModel,
          include: [
            {
              model: Model.EmployeeEducationModel,
              include: [
                {
                  model: Model.employeeSalaryModel,
                },
              ],
            },
          ],
        },
      ],
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("getAll err ==>>  ", error);
      });
  });
};
