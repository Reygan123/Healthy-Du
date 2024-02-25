const express = require("express");
const multer = require("multer")
const RecipeRoute = express.Router();
const RecipesController = require("../controllers/RecipeController");
const diskStorage = require("../middlewares/multer")

RecipeRoute.get("/:id", RecipesController.getRecipebyId);
RecipeRoute.post("/add", RecipesController.addRecipe);
RecipeRoute.put("/:id", RecipesController.updateRecipe);
RecipeRoute.get("/", RecipesController.getAllRecipe);
RecipeRoute.put("/upload/:id", multer({ storage: diskStorage }).single("image_url"), RecipesController.uploadImage);
RecipeRoute.delete("/:id", RecipesController.deleteRecipe);

module.exports = RecipeRoute;
