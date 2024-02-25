const express = require("express");
const StatusProgramRoute = express.Router();
const StatusProgramController = require("../controllers/StatusController");

StatusProgramRoute.post("/", StatusProgramController.createStatusProgram);
StatusProgramRoute.get("/", StatusProgramController.getAllStatusProgram);
StatusProgramRoute.get("/:id", StatusProgramController.getStatusProgrambyId);
StatusProgramRoute.put("/:id", StatusProgramController.updateStatusProgram);
StatusProgramRoute.delete("/:id", StatusProgramController.deleteStatusProgram);

module.exports = StatusProgramRoute; 