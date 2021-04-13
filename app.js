const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
//remove pagination
////check token when page is reloaded
////redirect to auth when token is invalid
//middleware
const db = require("./models");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/items", require("./controllers/items.get"));
app.use("/item", require("./controllers/item.post"));
app.use("/item", require("./controllers/item.delete"));
app.use("/item", require("./controllers/item.patch"));
app.use("/signup", require("./controllers/user.signup"));
app.use("/login", require("./controllers/user.login"));

const port = process.env.PORT || 3013;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
