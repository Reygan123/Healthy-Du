const express = require("express");
const joinCourseRoute = express.Router();
const JoinCourseController = require("../controllers/JoinController");

joinCourseRoute.post("/", JoinCourseController.createJoinCourse);
joinCourseRoute.get("/", JoinCourseController.getAllJoinCourse);
joinCourseRoute.get("/:id", JoinCourseController.getJoinCoursebyId);
joinCourseRoute.put("/:id", JoinCourseController.updateJoinCourse);
joinCourseRoute.delete("/:id", JoinCourseController.deleteJoinCourse);

module.exports = joinCourseRoute; 