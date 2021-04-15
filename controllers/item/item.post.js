const e = require("express");
const Router = e.Router();
const { body, validationResult } = require("express-validator");
const { Task } = require("../../models");
const authorization = require("../../authorization");

const post = Router.post(
  "/item",
  authorization,
  //body("message").isString(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array()[0].msg });
      }

      const task = await Task.findOne({
        where: { message: req.body.message, uuid: res.locals.id },
      });
      if (task) throw new Error("Task already exists");

      const item = await Task.create({
        uuid: res.locals.id,
        message: req.body.message,
      });
      res.send(item);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
);
module.exports = post;
