const fs = require('fs')
const e = require('express')
const path = './tasks.json'
const Router = e.Router()
const { body, validationResult } = require('express-validator');

const patch = Router.patch('/:id',

  body('name').optional().isString(),
  body('done').optional().isBoolean(),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let tasks  = fs.readFileSync(path, 'utf8')
    const json = JSON.parse(tasks)
  
    const itemToBeEdited = json.find(el => el.uuid == req.params.id)
    if (itemToBeEdited == null) {
      return res.status(404).send("Id does not exist");
    }

    if (req.body.name != null) {
      itemToBeEdited.name = req.body.name
    }

    if (req.body.done != null) {
      itemToBeEdited.done = req.body.done
    }
    fs.writeFileSync(path, JSON.stringify(json))
    res.send(itemToBeEdited)
})

module.exports = patch
