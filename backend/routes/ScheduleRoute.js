const express = require("express");
const Schedule = express.Router();
const ScheduleController = require("../controllers/ScheduleController");

Schedule.post("/", ScheduleController.createSchedule);
Schedule.get("/", ScheduleController.getAllSchedule);
Schedule.get("/:id", ScheduleController.getSchedulebyId);
Schedule.put("/:id", ScheduleController.updateSchedule);
Schedule.delete("/:id", ScheduleController.deleteSchedule);

module.exports = Schedule; 