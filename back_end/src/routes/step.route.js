const express = require("express");
const router = express.Router();
const verifyToken = require("../../config/helpers/auth");

const StepService = require("../services/StepService");


router.get("/:taskId", verifyToken, StepService.getStepsOfTaks);

router.post("/", verifyToken, StepService.createStep);

router.put("/", verifyToken, StepService.updateStep);

router.delete("/:stepId", verifyToken, StepService.deleteStep);


module.exports = router;
