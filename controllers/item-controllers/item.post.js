const e = require("express");
const Router = e.Router();
const { body, validationResult } = require("express-validator");
const { Task } = require("../../models");
const jwt = require("jsonwebtoken");
const authorization = require("../../authorization");

const post = Router.post(
  "/",
  authorization,
  body("message").isString(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0].msg });
      }

      const task = await Task.findOne({ where: { message: req.body.message } });
      if (task) throw new Error("Task already exists");

      const token = req.headers.authorization;
      const decoded = jwt.decode(token, { complete: true });

      const item = await Task.create({
        uuid: decoded.payload.id,
        message: req.body.message,
      });
      res.send(item);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
);
module.exports = post;
