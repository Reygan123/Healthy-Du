const express = require("express");
const FoodRouter = express.Router();
const FoodsController = require("../controllers/FoodController");

FoodRouter.get("/:id", FoodsController.getFoodbyId);
FoodRouter.post("/add", FoodsController.addFood);
FoodRouter.put("/:id", FoodsController.updateFood);
FoodRouter.get("/", FoodsController.getAllFood);
FoodRouter.delete("/:id", FoodsController.deleteFood);

module.exports = FoodRouter;
