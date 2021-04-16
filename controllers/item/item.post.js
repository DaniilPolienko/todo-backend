const e = require("express");
const Router = e.Router();
const { body } = require("express-validator");
const { Task } = require("../../models");
const authorization = require("../../middlewear/authorization");
const validate = require("../../validation");
const post = Router.post(
  "/item",
  authorization,

  body("message").isString().withMessage("Message value must be string"),
  async (req, res) => {
    try {
      validate(req);
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
