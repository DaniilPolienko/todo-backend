const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const db = require("./models");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/items", require("./controllers/item-controllers/items.get"));
app.use("/item", require("./controllers/item-controllers/item.post"));
app.use("/item", require("./controllers/item-controllers/item.delete"));
app.use("/item", require("./controllers/item-controllers/item.patch"));
app.use("/signup", require("./controllers/user-controllers/user.signup"));
app.use("/login", require("./controllers/user-controllers/user.login"));

const port = process.env.PORT || 3013;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
