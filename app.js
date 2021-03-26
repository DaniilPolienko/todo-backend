const express = require('express')
const bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator');
const uuid = require('uuid/v4');
const e = require('express');
const app = express()
const port = 3008

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


let items = []
let newItems = []
app.get('/items', (req, res) => {
  console.log(req.query)
  switch (req.query.sort) {
    case 'asc':
      newItems = items
      break;
    case 'desc':
    newItems = items.reverse()
      break;
    default: 
      newItems = items
  }
  switch (req.query.filter) {
    case 'done':
      newItems = items.filter(item => item.done == true)
      break;
    case 'undone':
      newItems = items.filter(item=>item.done == false)
      break;
    default:
      newItems = items
      break;
  }
  res.send(newItems)
})

app.post('/items',

  body('name').optional().isString(),
  body('done').optional().isBoolean(),


  (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const item = {
    uuid: uuid(),
    name: req.body.name,
    done: Boolean(req.body.done),
    createdAt: new Date()
  }
    items.push(item)
    res.send(item)
  });


app.delete('/:id', (req, res)=> {
  const itemToBeDeleted = items.find(el => el.uuid == req.params.id)
  if (itemToBeDeleted == null) {
    return res.status(404).send("Id does not exist");
  }
  else {
    items = items.filter(item => item.uuid !== req.params.id)
    res.send(items);
  }
   
})

app.patch('/:id',


  body('name').optional().isString(),
  body('done').optional().isBoolean(),


  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const itemToBeEdited = items.find(el => el.uuid == req.params.id)
    if (itemToBeEdited == null) {
      return res.status(404).send("Id does not exist");
    }

    if (req.body.name != null) {
      itemToBeEdited.name = req.body.name
    }

    if (req.body.done != null) {
      itemToBeEdited.done = req.body.done
    }
    res.send(itemToBeEdited)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
