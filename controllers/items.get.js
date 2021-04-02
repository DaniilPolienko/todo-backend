const e = require("express");
const Router = e.Router();
const { Task } = require("../models");
//query validation
const get = Router.get("/", async (req, res) => {
  try {
    const filter = {
      where: {},
      order: [],
    };
    if (req.query.filter) filter.where = { done: req.query.filter };
    if (req.query.sort)
      filter.order.push([
        "createdAt",
        req.query.sort === "asc" ? "ASC" : "DESC",
      ]);

    const items = await Task.findAll(filter);

    res.send(items);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});
module.exports = get;
