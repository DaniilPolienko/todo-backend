const e = require("express");
const Router = e.Router();
const { body, validationResult, Result } = require("express-validator");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

      const user = await User.findOne({
        where: { email: req.body.email },
      });
      if (!user)
        return res.status(400).send("User with such email doesn't exist");

      if (!bcrypt.compareSync(req.body.password, user.password))
        return res.send("Wrong username/password");

      const token = jwt.sign({ id: user.id }, "secret", { expiresIn: 300 });

      res.json({
        token,
        result: {
          id: user.id,
          firstName: user.firstName,
        },
      });
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
);
module.exports = postUser;
