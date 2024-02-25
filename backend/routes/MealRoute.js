const express = require("express");
const multer = require("multer")
const MealRouter = express.Router();
const MealsController = require("../controllers/MealController");
const diskStorage = require("../middlewares/multer")

MealRouter.get("/:id", MealsController.getMeal);
MealRouter.post("/add", MealsController.addMeal);
MealRouter.put("/:id", MealsController.updateMeal);
MealRouter.get("/", MealsController.getAllMeal);
MealRouter.put("/upload/:id", multer({ storage: diskStorage }).single("image_url"), MealsController.uploadImage);
MealRouter.delete("/:id", MealsController.deleteMeal);

module.exports = MealRouter;
