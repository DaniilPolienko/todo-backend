const e = require("express");
const Router = e.Router();
const { Task } = require("../models");

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

    console.log("---------------------------------", filter);
    const items = await Task.findAll(filter);
    console.log("---------------------------", items);
    res.send(items);
  } catch (err) {
    console.log(err);
  }
});
module.exports = get;
