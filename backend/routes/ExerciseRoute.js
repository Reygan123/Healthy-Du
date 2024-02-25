const express = require("express");
const ExerciseRoute = express.Router();
const ExerciseController = require("../controllers/ExerciseController");

ExerciseRoute.post("/", ExerciseController.addExercise);
ExerciseRoute.get("/", ExerciseController.getExercise);
ExerciseRoute.get("/:id", ExerciseController.getExerciseID);
ExerciseRoute.put("/:id", ExerciseController.updateExercise);
ExerciseRoute.get("/program/:id", ExerciseController.getExerciseByProgramId);
ExerciseRoute.delete("/:id", ExerciseController.deleteExercise);

module.exports = ExerciseRoute; 