const express = require("express");
const FoodReportRoute = express.Router();
const FoodReportController = require("../controllers/FoodReportController");

FoodReportRoute.post("/", FoodReportController.createFoodReport);
FoodReportRoute.get("/", FoodReportController.getAllFoodReport);
FoodReportRoute.get("/:id", FoodReportController.getFoodReportbyId);
FoodReportRoute.put("/:id", FoodReportController.updateFoodReport);
FoodReportRoute.delete("/:id", FoodReportController.deleteFoodReport);

module.exports = FoodReportRoute; 