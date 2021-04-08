const e = require("express");
const Router = e.Router();
const { body, validationResult } = require("express-validator");
const { User } = require("../models");
const bcrypt = require("bcrypt");

const postUser = Router.post(
  "/",
  body("email").isEmail(),
  body("password").isString(),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const checkIfExists = await User.findOne({
        where: { email: req.body.email },
      });
      if (!checkIfExists)
        return res.status(400).send("User with such email doesn't exist");

      bcrypt.compare(
        req.body.password,
        checkIfExists.password,
        (error, response) => {
          if (response) {
            res.send("Success");
          } else {
            res.send("Wrong username/password");
          }
        }
      );
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
);
module.exports = postUser;
