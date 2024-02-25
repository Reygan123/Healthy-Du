const express = require("express");
const ProgramRoute = express.Router();
const ProgramController = require("../controllers/ProgramController");

ProgramRoute.post("/", ProgramController.addProgram);
ProgramRoute.get("/", ProgramController.getAllProgram);
ProgramRoute.get("/:id", ProgramController.getProgrambyId);
ProgramRoute.put("/:id", ProgramController.updateProgram);
ProgramRoute.delete("/:id", ProgramController.deleteProgram);

module.exports = ProgramRoute; 