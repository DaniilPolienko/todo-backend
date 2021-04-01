const e = require('express')
const Router = e.Router()
const { body, validationResult } = require('express-validator');
const db = require('../models');
const { Task } = require('../models');

const post = Router.post('/',

  body('name').isString(),
  body('done').isBoolean(),


  async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  await Task.create({
    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    message: req.body.name,
    done: Boolean(req.body.done)
  })
    res.send("insert")
  
  });
  module.exports = post