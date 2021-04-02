const e = require("express");
const Router = e.Router();
const { Task } = require("../models");
const { query, validationResult } = require("express-validator");
//query validation
const get = Router.get(
  "/",
  query("filter").optional().isBoolean(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

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
  }
);
module.exports = get;
