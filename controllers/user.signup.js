const e = require("express");
const Router = e.Router();
const { check, validationResult } = require("express-validator");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const postUser = Router.post(
  "/",
  check("firstName").isString(),
  check("lastName").isString(),
  check("email").isEmail().withMessage("Invalid email"),
  check("password").isString(),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0].msg });
      }

      const checkIfExists = await User.findOne({
        where: { email: req.body.email },
      });
      if (checkIfExists) throw new Error("User with such email already exists");

      bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        const userCreate = await User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
        });

        const token = jwt.sign({ id: userCreate.id }, "secret", {
          expiresIn: 20,
        });

        res.send({
          token,
          result: {
            id: userCreate.id,
            firstName: userCreate.firstName,
          },
        });
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
);
module.exports = postUser;
