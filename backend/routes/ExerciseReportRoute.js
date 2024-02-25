const express = require("express");
const ExerciseReportRoute = express.Router();
const ExerciseReportController = require("../controllers/ExerciseReportController");

ExerciseReportRoute.post("/", ExerciseReportController.createExerciseReport);
ExerciseReportRoute.get("/", ExerciseReportController.getAllExerciseReport);
ExerciseReportRoute.get("/:id", ExerciseReportController.getExerciseReportbyId);
ExerciseReportRoute.put("/:id", ExerciseReportController.updateExerciseReport);
ExerciseReportRoute.delete("/:id", ExerciseReportController.deleteExerciseReport);

module.exports = ExerciseReportRoute;  