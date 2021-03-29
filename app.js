const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/items', require('./controllers/items.get'))
app.use('/item', require('./controllers/item.post'))
app.use('/item', require('./controllers/item.delete'))
app.use('/item', require('./controllers/item.patch'))

app.listen(process.env.PORT || "5001", () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})
