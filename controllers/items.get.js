const e = require("express");
const Router = e.Router();
const { Task } = require("../models");
const { query, validationResult } = require("express-validator");
const amountOfTasks = 5;
const jwt = require("jsonwebtoken");
const authorization = require("../authorization");
const get = Router.get(
  "/",
  authorization,
  query("filter").optional().isBoolean(),
  query("page").isNumeric(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const token = req.headers.authorization;
      const decoded = jwt.decode(token, { complete: true });
      console.log(decoded.payload.id);
      const filter = {
        where: { uuid: decoded.payload.id },
        order: [],
      };

      if (req.query.filter)
        filter.where = { done: req.query.filter, uuid: decoded.payload.id };
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
