const e = require("express");
const Router = e.Router();
const { body, validationResult } = require("express-validator");
const { Task } = require("../models");
const patch = Router.patch(
  "/:id",

  body("name").optional().isString(),
  body("done").optional().isBoolean(),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const edit = {
      message: req.body.name,
      done: req.body.done,
    };
    const itemToBeEdited = await Task.findOne({ where: { id: req.params.id } });
    itemToBeEdited.message = edit.message || itemToBeEdited.message;
    itemToBeEdited.done = edit.done || itemToBeEdited.done;
    await itemToBeEdited.save();
    res.send(itemToBeEdited);
  }
);

module.exports = patch;
