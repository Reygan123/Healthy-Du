const express = require("express");
const CourseRouter = express.Router();
const CoursesController = require("../controllers/CourseController");

CourseRouter.get("/:id", CoursesController.getCoursebyId);
CourseRouter.post("/add", CoursesController.addCourse);
CourseRouter.put("/:id", CoursesController.updateCourse);
CourseRouter.get("/", CoursesController.getAllCourse);
CourseRouter.delete("/:id", CoursesController.deleteCourse);

module.exports = CourseRouter;
