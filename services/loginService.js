const Model = require("../models/index");

exports.findUserByEmail = (data) => {
  console.log(data);
  return new Promise((resolve, reject) => {
    Model.UserModel.findOne({
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

exports.registration = (data) => {
  return new Promise((resolve, reject) => {
    Model.UserModel.create(data)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("Unable to Register the User");
      });
  });
};

exports.findUserById = (data) => {
  return new Promise((resolve, reject) => {
    console.log(data);
    Model.UserModel.findOne({
      where: {
        id: data.id,
      },
    })
      .then((result) => {
        resolve(result);
      })
      .catch((error) => {
        console.log("User Not Exits in Database", error);
      });
  });
};

exports.changePassword = (data) => {
    return new Promise((resolve, reject) => {
      Model.UserModel.update(
        {
          password: data.password,
        },
        {
          where: {
            id: data.id,
          },
        }
      )
        .then((result) => {
          console.log("RESULT", result); /* 1 */
          resolve(result);
          return result;
        })
        .catch((error) => {
          console.log("Unable to Update User", error);
        });
    });
  };
