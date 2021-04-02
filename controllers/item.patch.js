const e = require("express");
const Router = e.Router();
const { body, validationResult } = require("express-validator");
const { Task } = require("../models");
const patch = Router.patch(
  "/:id",

  body("name").optional().isString(),
  body("done").optional().isBoolean(),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const itemToBeEdited = await Task.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      res.send(itemToBeEdited);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
);

module.exports = patch;
