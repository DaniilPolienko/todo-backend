
const fs = require('fs')
const e = require('express')
const path = './tasks.json'
const Router = e.Router()
const { body, validationResult } = require('express-validator');
//const uuid = require('uuid/v4');
//import { v4 as uuidv4 } from 'uuid'
const post = Router.post('/',

  body('name').isString(),
  body('done').isBoolean(),


  (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  let tasks  = fs.readFileSync(path, 'utf8')
  const item = {
    uuid: Date.now().toString(36) + Math.random().toString(36).substring(2),
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