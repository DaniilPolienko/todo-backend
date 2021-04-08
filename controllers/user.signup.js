const e = require("express");
const Router = e.Router();
const { body, validationResult } = require("express-validator");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const postUser = Router.post(
  "/",
  body("firstName").isString(),
  body("lastName").isString(),
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
      if (checkIfExists)
        return res.status(400).send("User with such email already exists");

      bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        if (err) return res.status(400).send(err.err);

        const userCreate = await User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
        });
        res.send(userCreate);
      });
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
);
module.exports = postUser;
