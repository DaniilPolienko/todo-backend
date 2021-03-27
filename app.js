const express = require('express')
const bodyParser = require('body-parser')
const { body, validationResult } = require('express-validator');
const uuid = require('uuid/v3');
const e = require('express');
const fs = require('fs')
const app = express()
const port = 3008

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


let tasks  = fs.readFileSync('tasks.json', 'utf8')
app.get('/items', (req, res) => {
  let newItems = []
  switch (req.query.sort) {
    case 'asc':
      newItems = tasks
      break;
    case 'desc':
    newItems = tasks.reverse()
      break;
    default: 
      newItems = tasks
  }
  switch (req.query.filter) {
    case 'done':
      newItems = tasks.filter(item => item.done == true)
      break;
    case 'undone':
      newItems = tasks.filter(item=>item.done == false)
      break;
    default:
      newItems = tasks
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
   
    const json = JSON.parse(tasks)     

    json.push(item)

    fs.writeFileSync('tasks.json', JSON.stringify(json))
    res.send(item)
  });


app.delete('/:id', (req, res)=> {
  
  try {     
  const json = JSON.parse(tasks)
  tasks = json.filter(item => item.uuid !== req.params.id)
  res.send(tasks);
  }
  catch {
    return res.status(404).send("Task not found");
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
    fs.writeFileSync('tasks.json', JSON.stringify(json))
    res.send(itemToBeEdited)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
