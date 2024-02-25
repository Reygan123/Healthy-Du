const express = require("express");
const WeekRouter = express.Router();
const WeekController = require("../controllers/WeekController");

WeekRouter.get("/:id", WeekController.getWeekbyId);
WeekRouter.post("/add", WeekController.addWeek);
WeekRouter.put("/:id", WeekController.updateWeek);
WeekRouter.get("/", WeekController.getAllWeek);
WeekRouter.delete("/:id", WeekController.deleteWeek);

module.exports = WeekRouter;
