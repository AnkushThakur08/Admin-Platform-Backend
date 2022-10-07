const Model = require("../models/index");
const { Op } = require("sequelize");

exports.findBySalaryType = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    Model.Salarymodel.findOne({
      where: {
        salaryType: data.salaryType,
      },
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Find the Salary Level.", error);
      });
  });
};

exports.addSalary = (data) => {
  console.log("21", data);
  return new Promise((resolve, reject) => {
    Model.Salarymodel.create(data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Add the Salary level");
      });
  });
};

exports.getSalary = (data) => {
  return new Promise((resolve, reject) => {
    Model.Salarymodel.findAndCountAll({
      where: {
        isBlocked: 0,
      },
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Add the education Qualification");
      });
  });
};

exports.getIndividualSalary = (data) => {
  return new Promise((resolve, reject) => {
    Model.Salarymodel.findOne({
      where: {
        salaryId: data.salaryId,
      },
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Add the education Qualification");
      });
  });
};

exports.findById = (data) => {
  console.log(data);

  return new Promise((resolve, reject) => {
    Model.Salarymodel.findOne({
      where: {
        salaryId: data.salaryId,
      },
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Salary Level Does not Exists");
      });
  });
};

exports.updateSalaryRange = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    Model.Salarymodel.update(
      {
        minSalary: data.minSalary,
        maxSalary: data.maxSalary,
      },
      {
        where: {
          salaryId: data.salaryId,
        },
      }
    )
      .then((result) => {
        console.log("RESULT", result);
        resolve(result);
        return result;
      })
      .catch((error) => {
        console.log("Unable to edit the Education Qualification");
      });
  });
};

exports.blockSalary = (data) => {
  return new Promise((resolve, reject) => {
    Model.Salarymodel.update(
      { isBlocked: 1 },
      { where: { salaryId: data.salaryId } }
    )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to block the Salary", error);
      });
  });
};

exports.UnblockSalary = (data) => {
  return new Promise((resolve, reject) => {
    Model.Salarymodel.update(
      { isBlocked: 0 },
      { where: { salaryId: data.salaryId } }
    )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Block the Education Qualification  ", error);
      });
  });
};

exports.filterSalary = (criteria, limit, offset) => {
  let where = {};
  let order = [
    [
      criteria.sortBy ? criteria.sortBy : "createdAt" || "eduName" || "eduId",
      criteria.orderBy ? criteria.orderBy : "ASC" || "DESC",
    ],
  ];
  if (criteria && criteria.search) {
    where = {
      [Op.or]: {
        eduName: {
          [Op.like]: "%" + criteria.search + "%",
        },
      },
    };
  }
  if (criteria && criteria.eduName) {
    where.eduName = criteria.eduName;
  }

  if (criteria && criteria.minSalary) {
    where = {
      minSalary: {
        [Op.lte]: criteria.minSalary,
      },
    };
  }
  if (criteria && criteria.maxSalary) {
    where = {
      maxSalary: {
        [Op.gte]: criteria.maxSalary,
      },
    };
  }

  if (criteria["isBlocked"] === 1) where.isBlocked = 1;
  if (criteria["isBlocked"] === 0) where.isBlocked = 0;
  return new Promise((resolve, reject) => {
    Model.Salarymodel.findAndCountAll({
      limit,
      offset,
      where: where,
      order: order,
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("getAll err ==>>  ", error);
      });
  });
};

// FIXME: ASSOCATION
Model.Salarymodel.hasMany(Model.DepartmentModel, { foreignKey: "salaryType" });

exports.getSalaryDetails = (criteria) => {
  return new Promise((resolve, reject) => {
    Model.Salarymodel.findAndCountAll({
      include: [
        {
          model: Model.DepartmentModel,
          attributes: ["DeptName", "deptId"],
        },
      ],
    })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log("getAll err ==>>  ", err);
      });
  });
};

exports.getIndividualSalaryDetails = (data) => {
  return new Promise((resolve, reject) => {
    Model.Salarymodel.findOne({
      where: {
        salaryId: data.salaryId,
      },
      include: [
        {
          model: Model.DepartmentModel,
          attributes: ["DeptName", "deptId"],
        },
      ],
    })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log("getAll err ==>>  ", err);
      });
  });
};

exports.getCombineSalaryDetails = (data) => {
  return new Promise((resolve, reject) => {
    Model.Salarymodel.findAndCountAll({
      include: [
        {
          model: Model.DepartmentModel,
          exclude: ["DeptName", "deptId"],
        },
      ],
    })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log("getAll err ==>>  ", err);
      });
  });
};
