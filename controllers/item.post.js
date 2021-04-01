
const fs = require('fs')
const e = require('express')
const path = './tasks.json'
const Router = e.Router()
const { body, validationResult } = require('express-validator');
const pool = require('../db')
const post = Router.post('/',

  body('name').isString(),
  body('done').isBoolean(),


  async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const item = {
    uuid: Date.now().toString(36) + Math.random().toString(36).substring(2),
    name: req.body.name,
    done: Boolean(req.body.done),
    createdAt: new Date()
  }
    const newTodo = await pool.query(`INSERT INTO todo (todo_id, todo_message, todo_done, todo_created_at)
                                       VALUES (${item.uuid}, ${item.name}, ${item.done}, ${item.createdAt}`)

    res.send(newTodo.rows)
  });
  module.exports = post