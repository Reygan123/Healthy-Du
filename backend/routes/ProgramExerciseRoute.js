const express = require("express");
const ProgramExerciseRoute = express.Router();
const ProgramExerciseController = require("../controllers/ProgramExerciseController");

ProgramExerciseRoute.post("/", ProgramExerciseController.createProgramExercise);
ProgramExerciseRoute.get("/", ProgramExerciseController.getAllProgramExercise);
ProgramExerciseRoute.get("/:id", ProgramExerciseController.getProgramExercisebyId);
ProgramExerciseRoute.put("/:id", ProgramExerciseController.updateProgramExercise);
ProgramExerciseRoute.delete("/:id", ProgramExerciseController.deleteProgramExercise);

module.exports = ProgramExerciseRoute; 