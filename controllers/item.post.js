const e = require("express");
const Router = e.Router();
const { body, validationResult } = require("express-validator");
const { Task } = require("../models");
const jwt = require("jsonwebtoken");

const post = Router.post("/", body("message").isString(), async (req, res) => {
  try {
    const decoded = jwt.decode(req.body.token, { complete: true });
    const expireTime = decoded.payload.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime >= expireTime) throw new Error("Token is expired");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const task = await Task.findOne({ where: { message: req.body.message } });
    if (task) return res.status(400).send("Task already exists");

    console.log("11111111111111111111111", req.body.uuid);
    console.log("2222222222222222222222", req.body.token);
    console.log("3333333333333333333333", req.body.message);
    const item = await Task.create({
      uuid: req.body.uuid,
      message: req.body.message,
    });
    res.send(item);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
module.exports = post;
