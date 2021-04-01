const e = require("express");
const Router = e.Router();
const { Task } = require("../models");

const get = Router.get("/", async (req, res) => {
  try {
    const filter = {
      where: {},
      order: [],
    };
    if (req.query.done) filter.where.done = req.query.done;
    if (req.query.sort)
      filter.order.push([
        "createdAt",
        req.query.sort === "asc" ? "ASC" : "DESC",
      ]);

    const items = await Task.findAll(filter);

    res.send(items);
  } catch (err) {
    console.log(err);
  }
});
module.exports = get;
