const express = require("express");
const router = express.Router();
require("dotenv").config();

const accountService = require("../services/AccountService");
const List = require("../models/List");
const Task = require("../models/Task");
const verifyToken = require("../../config/helpers/auth");

router.post("/create", accountService.create);

router.post("/changepw", accountService.changePassword) 

router.post("/login", accountService.login);

router.post("/sendEmail/:accountId", accountService.sendMail);

module.exports = router;
