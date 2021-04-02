const e = require("express");
const Router = e.Router();
const { Task } = require("../models");

const remove = Router.delete("/:id", async (req, res) => {
  const itemToBeDeleted = await Task.findOne({ where: { id: req.params.id } });
  itemToBeDeleted.destroy();
  res.send(itemToBeDeleted);
});

module.exports = remove;
