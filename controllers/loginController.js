// DOTENV
require("dotenv").config();

// Express-Validator
const { check, body, validationResult } = require("express-validator");

// Services
const Service = require("../services");

// FOR PASSWORD
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

// FOR NODEMAILER
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");

// Cookie
const cookieParser = require("cookie-parser");

module.exports = {
  registration: async (data, req, res) => {
    console.log(data);
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    if (userData) {
      // VALIDATION
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return {
          status: 400,
          message: errors.array()[0].msg + " in " + errors.array()[0].param,
          // parameter: errors.array()[0].param,
        };
      }
      const user = await Service.loginService.findUserByEmail(userData);
      if (user) {
        return {
          status: 400,
          message: "User already exists",
        };
      }
      try {
        const value = data.password;
        const salt = await bcrypt.genSalt(8);
        const hashPassword = await bcrypt.hash(value, salt);

        if (userData.email) {
          let userData = {
            name: data.name,
            email: data.email,
            password: hashPassword,
          };
          const user = await Service.loginService.registration(userData);

          return {
            status: 200,
            message: "User Registered Successfully",
            json: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          };
        }
      } catch (error) {
        return {
          status: 400,
          message: "Something went Wrong / Please enter Valid Details ",
        };
      }
    } else {
      return {
        status: 400,
        message: "Please Enter all the Fields",
      };
    }
  },

  login: async (data, req, res) => {
    const userData = {
      email: data.email,
      password: data.password,
    };

    if (userData.email) {
      const user = await Service.loginService.findUserByEmail(userData);
      if (user) {
        if (data.email && data.password) {
          const passwordMatch = await bcrypt.compare(
            data.password,
            user.password
          );

          if (user.email && passwordMatch) {
            // Generate Token
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
            console.log(token);

            // Put Token in the cookies
            res.cookie("token", token, { expire: new Date() + 9999 });

            return {
              status: 200,
              message: "User loggedIn successfully",
              token: token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
              },
            };
          } else {
            return {
              status: 400,
              message: "User name and Password Does Not match",
            };
          }
        } else {
          return {
            status: 400,
            message: "User Name and Password Does Not match",
          };
        }
      } else {
        return {
          status: 400,
          message: "User Does not exist",
        };
      }
    } else if (!userData.name && !userData.email && !userData.password) {
      return {
        status: 400,
        message: "Please enter all the fields",
      };
    }
  },

  // Password Reset
  sendResetPasswordMail: async (data, req, res) => {
    const userData = {
      email: data.email,
    };

    if (userData.email) {
      const user = await Service.loginService.findUserByEmail(userData);
      if (user) {
        const secret = user.email + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ email: user.email }, secret, {
          expiresIn: "15m",
        });

        console.log(token);
        // SEND MAIL
        const transporter = nodemailer.createTransport(
          sgTransport({
            auth: {
              api_key: process.env.NODEMAILER_KEY,
            },
          })
        );

        transporter.sendMail({
          to: data.email,
          from: "tankush778@gmail.com",
          subject: "Password Reset Mail from Ankush",
          html: `<h3>This is your Password Reset Mail</h3>
          <h3> Click on the <a href="http://localhost:3000/reset/${token}/${user.id}">link </a> to reset your password</h3>
            `,
        });
        return {
          status: 200,
          message: "Email Sent Successfully",
        };
      } else {
        return {
          status: 400,
          message: "User Email Does Not Found in the Database",
        };
      }
    } else {
      return {
        status: 400,
        message: "Please enter your Email",
      };
    }
  },

  changePassword: async (data) => {
    const userData = {
      id: data.id,
      password: data.password,
    };

    console.log(userData);

    const user = await Service.loginService.findUserById(userData);
    if (user) {
      const value = data.password;
      const salt = await bcrypt.genSalt(8);
      const hashPassword = await bcrypt.hash(value, salt);

      let userData = {
        id: data.id,
        password: hashPassword,
      };

      const user = await Service.loginService.changePassword(userData);

      console.log(user);
      return {
        status: 200,
        message: "Password Update Successfully",
      };
    } else {
      return {
        status: 400,
        message: "User Does not Exists in the Database",
      };
    }
  },
};
