const e = require("express");
const Router = e.Router();
const { body } = require("express-validator");
const { Task } = require("../../models");
const authorization = require("../../middlewear/authorization");
const validate = require("../../validation");
const patch = Router.patch("/item", authorization, async (req, res) => {
  try {
    validate(req);
    console.log(req.body);
    // const itemToBeEdited = await Task.update({

    //   where: { id: req.body.todo.id, uuid: res.locals.id },
    //   returning: true,
    // });

    // if (itemToBeEdited[0] === 0) throw new Error("Forbidden");
    // res.send(itemToBeEdited);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = patch;
