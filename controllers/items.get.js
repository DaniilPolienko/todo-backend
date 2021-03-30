'use strict'
const fs = require('fs')
const e = require('express')
const path = './tasks.json'
const Router = e.Router()



const get = Router.get('/', (req, res) => {
   res.set('Access-Control-Allow-Origin', '*')
    let tasks  = fs.readFileSync(path, 'utf8')
    let newItems = []
    const json = JSON.parse(tasks)  
    switch (req.query.sort) {
      case 'asc':
        newItems = json
        break;
      case 'desc':
      newItems = json.reverse()
        break;
      default: 
        newItems = json
    }
    switch (req.query.filter) {
      case 'done':
        newItems = json.filter(item => item.done == true)
        break;
      case 'undone':
        newItems = json.filter(item=>item.done == false)
        break;
      default:
        newItems = json
        break;
    }
    res.send(newItems)
  
  })
  module.exports = get