
const fs = require('fs')
const e = require('express')
const path = './tasks.json'
const Router = e.Router()
const { body, validationResult } = require('express-validator');
const uuid = require('uuid/v4');

const post = Router.post('/',

  body('name').optional().isString(),
  body('done').optional().isBoolean(),


  (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let tasks  = fs.readFileSync(path, 'utf8')
  const item = {
    uuid: uuid(),
    name: req.body.name,
    done: Boolean(req.body.done),
    createdAt: new Date()
  }
    const json = JSON.parse(tasks)     
    json.push(item)
    fs.writeFileSync(path, JSON.stringify(json))
    res.send(item)
  });

  module.exports = post