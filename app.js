const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const db = require("./models");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/items", require("./controllers/items.get"));
app.use("/item", require("./controllers/item.post"));
app.use("/item", require("./controllers/item.delete"));
app.use("/item", require("./controllers/item.patch"));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
