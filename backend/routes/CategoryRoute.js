const express = require("express");
const CategoryRouter = express.Router();
const CategoryController = require("../controllers/CategoryController");

CategoryRouter.get("/:id", CategoryController.getCategorybyId);
CategoryRouter.post("/add", CategoryController.addCategory);
CategoryRouter.put("/:id", CategoryController.updateCategory);
CategoryRouter.get("/", CategoryController.getAllCategory);
CategoryRouter.delete("/:id", CategoryController.deleteCategory);

module.exports = CategoryRouter;
