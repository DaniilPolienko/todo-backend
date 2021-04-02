const e = require("express");
const Router = e.Router();
const { body, validationResult } = require("express-validator");
const { Task } = require("../models");
//message validation
const post = Router.post("/", body("name").isString(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const item = await Task.create({
      message: req.body.name,
    });
    res.send(item);
  } catch (err) {
    return res.status(400).send("Task already exists");
  }
});
module.exports = post;
