const e = require("express");
const Router = e.Router();
const { body } = require("express-validator");
const { Task } = require("../../models");
const authorization = require("../../middlewear/authorization");
const validate = require("../../validation");
const patch = Router.patch(
  "/item",
  authorization,

  body("message")
    .optional()
    .isString()
    .withMessage("Message value must be string"),
  body("done").optional().isBoolean().withMessage("Done value must be boolean"),

  async (req, res) => {
    try {
      validate(req);
      console.log(req.body);
      if (req.body.todo.message && !req.body.todo.done) {
        const task = await Task.findOne({
          where: { message: req.body.todo.message, uuid: res.locals.id },
        });
        if (task) throw new Error("Task already exists");
      }

      const itemToBeEdited = await Task.update(req.body.todo, {
        where: { id: req.body.todo.id, uuid: res.locals.id },
        returning: true,
      });

      if (itemToBeEdited[0] === 0) throw new Error("Forbidden");
      res.send(itemToBeEdited);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
);

module.exports = patch;
