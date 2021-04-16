const e = require("express");
const Router = e.Router();
const { Task } = require("../../models");
const { query } = require("express-validator");
const amountOfTasks = 5;
const authorization = require("../../middlewear/authorization");
const validate = require("../../validation");
const get = Router.get(
  "/items",
  authorization,
  query("filter")
    .optional()
    .isBoolean()
    .withMessage("Filter value must be boolean"),
  query("page").isNumeric().withMessage("Page value must be numeric"),
  async (req, res) => {
    try {
      validate(req);

      const filter = {
        where: { uuid: res.locals.id },
        order: [],
      };

      if (req.query.filter) filter.where.done = req.query.filter;
      if (req.query.sort)
        filter.order.push([
          "createdAt",
          req.query.sort === "asc" ? "ASC" : "DESC",
        ]);

      const items = await Task.findAndCountAll({
        limit: amountOfTasks,
        offset: (req.query.page - 1) * amountOfTasks,
        where: filter.where,
        order: filter.order,
      });

      res.send(items);
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }
);
module.exports = get;
