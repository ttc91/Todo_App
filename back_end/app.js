const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const accountRouter = require("./src/routes/account.route");
const stepRouter = require("./src/routes/step.route");
const taskRouter = require("./src/routes/task.route");

const bodyparser = require("body-parser");
const db = require("./config/db/index");
require("dotenv").config();
const errorHandler = require("./config/helpers/error-handler");
const authJwt = require("./config/helpers/jwt")

const api = process.env.API_URL;

const port = 3000;

db.connect();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
//app.use(cors());
app.use(morgan("tiny"));
app.use(errorHandler);

//app.use(authJwt())
app.use(api + "/account", accountRouter);
app.use(api + "/step", stepRouter);
app.use(api + "/task", taskRouter);
app.use(express.json);

app.listen(port, () => {
  console.log(`server is running http://localhost:${port}`);
});
