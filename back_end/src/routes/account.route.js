const express = require("express");
const router = express.Router();
require("dotenv").config();

const accountService = require("../services/AccountService");
const List = require("../models/List");
const Task = require("../models/Task");
const verifyToken = require("../../config/helpers/auth");

router.post("/create", accountService.create);

router.post("/login", accountService.login);

router.get("/create-db", verifyToken, (req, res) => {
  console.log(req.userId);
  const list = new List({ listName: "Test List", account: req.userId });

  list.save().then((list) => {
    const task = new Task({
      taskName: "Test Task",
      note: "None",
      isCompleted: false,
      isImportant: false,
      isToday: true,
      deadline: new Date(),
      remindAt: null,
      file: null,
      list: list._id,
    });
    task.save().then((tsk) => {
      console.log(tsk);
    });
  });

  res.send("OK");
});
module.exports = router;
