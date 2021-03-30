'use strict'
// const dotenv = require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const path = './tasks.json'
const emptyArray = []

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


if (fs.existsSync(path)) console.log('The path exists.');
  else {
    fs.open(path, 'w', (err) => {
      if(err) throw err;
      console.log('File created');
    });
  fs.writeFileSync(path, JSON.stringify(emptyArray))
  }

app.use('/items', require('./controllers/items.get'))
app.use('/item', require('./controllers/item.post'))
app.use('/item', require('./controllers/item.delete'))
app.use('/item', require('./controllers/item.patch'))

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
