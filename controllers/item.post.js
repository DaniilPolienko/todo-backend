const e = require("express");
const Router = e.Router();
const { body, validationResult } = require("express-validator");
const { Task } = require("../models");

const post = Router.post("/", body("message").isString(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const task = await Task.findOne({ where: { message: req.body.message } });
    if (task) return res.status(400).send("Task already exists");

    const item = await Task.create({ message: req.body.message });
    res.send(item);
  } catch (err) {
    return res.status(400).send("Task already exists");
  }
});
module.exports = post;
