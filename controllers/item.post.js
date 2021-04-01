const e = require("express");
const Router = e.Router();
const { body, validationResult } = require("express-validator");
const { Task } = require("../models");

const post = Router.post(
  "/",
  body("name").isString(),
  body("done").isBoolean(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const item = await Task.create({
      message: req.body.name,
      done: Boolean(req.body.done),
    });
    res.send(item);
  }
);
module.exports = post;
