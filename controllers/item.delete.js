'use strict'
const fs = require('fs')
const e = require('express')
const path = './tasks.json'
const Router = e.Router()

const remove = Router.delete('/:id', (req, res)=> {
    let tasks  = fs.readFileSync(path, 'utf8')
  
    const json = JSON.parse(tasks)

    const itemToBeDeleted = json.find(item => item.uuid == req.params.id)
    if (itemToBeDeleted == null) {
        return res.status(404).send("Task not found")
    }
    else {
        tasks = json.filter(item => item.uuid !== req.params.id)
        res.send(itemToBeDeleted);
        fs.writeFileSync(path, JSON.stringify(tasks))
    }
  })

  module.exports = remove