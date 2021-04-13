const e = require("express");
const Router = e.Router();
const { Task } = require("../models");
const authorization = require("../authorization");
const remove = Router.delete("/", authorization, async (req, res) => {
  try {
    const itemToBeDeleted = await Task.findOne({
      where: { id: req.query.id },
    });
    itemToBeDeleted.destroy();
    res.send(itemToBeDeleted);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

module.exports = remove;
