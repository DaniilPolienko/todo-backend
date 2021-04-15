const e = require("express");
const Router = e.Router();
const { body, validationResult } = require("express-validator");
const { Task } = require("../../models");
const authorization = require("../../middlewear/authorization");

const patch = Router.patch(
  "/item",
  authorization,

  body("message").optional().isString(),
  body("done").optional().isBoolean(),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      if (req.body.message) {
        const task = await Task.findOne({
          where: { message: req.body.message },
        });
        if (task) throw new Error("Task already exists");
      }
      const itemToBeEdited = await Task.update(req.query, {
        where: { id: req.query.id },
        returning: true,
      });
      res.send(itemToBeEdited);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
);

module.exports = patch;
