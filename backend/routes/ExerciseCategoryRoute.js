const express = require("express");
const ExerciseCategoryRoute = express.Router();
const ExerciseCategoryController = require("../controllers/ExerciseCategoryController");

ExerciseCategoryRoute.post("/", ExerciseCategoryController.createExerciseCategory);
ExerciseCategoryRoute.get("/", ExerciseCategoryController.getAllExerciseCategory);
ExerciseCategoryRoute.get("/:id", ExerciseCategoryController.getExerciseCategorybyId);
ExerciseCategoryRoute.put("/:id", ExerciseCategoryController.updateExerciseCategory);
ExerciseCategoryRoute.delete("/:id", ExerciseCategoryController.deleteExerciseCategory);

module.exports = ExerciseCategoryRoute; 