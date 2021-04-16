const e = require("express");
const Router = e.Router();
const { Task } = require("../../models");
const authorization = require("../../middlewear/authorization");

const remove = Router.delete(
  "/item",
  authorization,

  async (req, res) => {
    try {
      const itemToBeDeleted = await Task.findOne({
        where: { id: req.query.id },
      });
      if (!itemToBeDeleted) res.status(404).send("Not Found");
      if (itemToBeDeleted.uuid !== res.locals.id)
        res.status(403).send("Forbidden");

      itemToBeDeleted.destroy();
      res.send(itemToBeDeleted);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
);

module.exports = remove;
