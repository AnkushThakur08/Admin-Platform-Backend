const Model = require("../models/index");

exports.findByName = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    Model.EducationModel.findOne({
      where: {
        eduName: data.eduName,
      },
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Find the Education.", error);
      });
  });
};

exports.addEducation = (data) => {
  console.log("21", data);
  return new Promise((resolve, reject) => {
    Model.EducationModel.create(data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Add the education Qualification");
      });
  });
};

exports.getEducationQualification = (data) => {
  return new Promise((resolve, reject) => {
    Model.EducationModel.findAndCountAll({
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

exports.getIndividualEducationQualification = (data) => {
  return new Promise((resolve, reject) => {
    Model.EducationModel.findOne({
      where: {
        eduId: data.eduId,
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
    Model.EducationModel.findOne({
      where: {
        eduId: data.eduId,
      },
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Education Qualification Does not Exists");
      });
  });
};

exports.updateEducationQualification = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    Model.EducationModel.update(
      {
        eduName: data.eduName,
      },
      {
        where: {
          eduId: data.eduId,
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

exports.blockEducationQualification = (data) => {
  return new Promise((resolve, reject) => {
    Model.EducationModel.update(
      { isBlocked: 1 },
      { where: { eduId: data.eduId } }
    )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to block the Education Qualification", error);
      });
  });
};

exports.UnblockEducationQualification = (data) => {
  return new Promise((resolve, reject) => {
    Model.EducationModel.update(
      { isBlocked: 0 },
      { where: { eduId: data.eduId } }
    )
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Block the Education Qualification  ", error);
      });
  });
};

// exports.filterUser = (criteria) => {
//   console.log("118", criteria);
//   //   let where = {};
//   //   if (criteria.isBlocked === 1) where.isBlocked = 1;
//   //   if (criteria["isBlocked"] === 0) where.isBlocked = 0;
//   return new Promise((resolve, reject) => {
//     Model.EducationModel.findAndCountAll({
//       where: { isBlocked: criteria },
//     })
//       .then((result) => {
//         resolve(result);
//       })
//       .catch((error) => {
//         console.log("getAll err ==>>  ", error);
//       });
//   });
// };

exports.filterUser = (criteria, limit, offset) => {
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

  if (criteria["isBlocked"] === 1) where.isBlocked = 1;
  if (criteria["isBlocked"] === 0) where.isBlocked = 0;
  return new Promise((resolve, reject) => {
    Model.EducationModel.findAndCountAll({
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
