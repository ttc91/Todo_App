const express = require("express");
const router = express.Router();
const service = require("../services/TaskService");
const verifyToken = require("../../config/helpers/auth");

router.post("/create", verifyToken, service.create);
router.put("/update", verifyToken, service.update);
router.put("/update-note", verifyToken, service.updateNote);

router.post("/import", verifyToken, service.import);
router.get("/:listId", verifyToken, service.getAll);
router.get("/:id", verifyToken, service.getOne);
router.delete("/:id", verifyToken, service.delete);
module.exports = router;
