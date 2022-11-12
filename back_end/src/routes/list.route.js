const express = require("express");
const router = express.Router();
const service = require("../services/ListService");
const verifyToken = require("../../config/helpers/auth");

router.post("/create", verifyToken, service.create);
router.put("/update", verifyToken, service.update);
router.get("/get_all", verifyToken, service.getAll);
router.get("/:id", verifyToken, service.getOne);
router.delete("/:id", verifyToken, service.delete);

module.exports = router;
