'use strict'
const fs = require('fs')
const e = require('express')
const path = './tasks.json'
const Router = e.Router()



const get = Router.get('/', (req, res) => {
   res.set('Access-Control-Allow-Origin', '*')
    let tasks  = fs.readFileSync(path, 'utf8')
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
  module.exports = get