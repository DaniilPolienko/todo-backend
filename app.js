const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const klawSync = require("klaw-sync");
const path = require("path");
const db = require("./models");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

async function useControllers() {
  const paths = klawSync("./controllers", { nodir: true });
  let controllersCount = 0;
  paths.forEach((file) => {
    if (
      path.basename(file.path)[0] === "_" ||
      path.basename(file.path)[0] === "."
    )
      return;
    app.use("/", require(file.path));
    controllersCount++;
    console.log(file.path);
  });

  console.log(`Total controllers: ${controllersCount}`);
}

useControllers();
const port = process.env.PORT || 3013;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
