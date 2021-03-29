const express = require('express')
const bodyParser = require('body-parser')
const e = require('express');
const app = express()
const port = 3008


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/items', require('./controllers/items.get'))
app.use('/item', require('./controllers/item.post'))
app.use('/item', require('./controllers/item.delete'))
app.use('/item', require('./controllers/item.patch'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
