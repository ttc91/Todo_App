const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
var cron = require("node-cron");

const accountRouter = require("./src/routes/account.route");
const stepRouter = require("./src/routes/step.route");
const taskRouter = require("./src/routes/task.route");
const listRouter = require("./src/routes/list.route");

const bodyparser = require("body-parser");
const db = require("./config/db/index");
require("dotenv").config();
const errorHandler = require("./config/helpers/error-handler");
const authJwt = require("./config/helpers/jwt");
const AccountService = require("./src/services/AccountService");

const api = process.env.API_URL;

const port = 3000;

db.connect();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));
app.use(errorHandler);

//app.use(authJwt())
app.use(api + "/accounts", accountRouter);
app.use(api + "/steps", stepRouter);
app.use(api + "/tasks", taskRouter);
app.use(api + "/lists", listRouter);
app.use(express.json);

cron.schedule(" * * 0 * * *", () => {
  console.log("Cron work");
  AccountService.sendMail();
});
app.listen(port, () => {
  console.log(`server is running http://localhost:${port}`);
});
