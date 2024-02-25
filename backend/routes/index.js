const express = require("express");
const router = express.Router();
const UserRouter = require("./UserRoute");
const FoodRouter = require("./FoodRoute")
const UsersController = require("../controllers/UserController");
const RecipeRouter = require("./RecipeRoute")
const MealRouter = require("./MealRoute")
const CategoryRouter = require("./CategoryRoute")
const ExerciseRouter = require("./ExerciseRoute")
const FoodReportRouter = require("./FoodReportRoute")
const CourseRouter = require("./CourseRoute")
const WeekRouter = require("./WeekRoute")
const ProgramRouter = require("./ProgramRoute")
const ProgramExerciseRouter = require("./ProgramExerciseRoute")
const ExerciseReportRouter = require("./ExerciseReportRoute")
const Schedule = require("./ScheduleRoute")
const JoinRouter = require("./JoinRoute")
const StatusRouter = require("./StatusRoute")
const ExerciseCategoryRouter = require("./ExerciseCategoryRoute")
const authMiddleware = require("../middlewares/AuthMiddleware");

router.post("/api/users/login", UsersController.loginUser);
router.post("/api/users/register", UsersController.registerUser);
router.get("/api/users/all", UsersController.getAllUser);

router.use(authMiddleware);

router.use("/api/users", UserRouter);
router.use("/api/foods", FoodRouter);
router.use("/api/recipes", RecipeRouter);
router.use("/api/meals", MealRouter);
router.use("/api/category", CategoryRouter);
router.use("/api/exercise", ExerciseRouter);
router.use("/api/report", FoodReportRouter);
router.use("/api/course", CourseRouter);
router.use("/api/week", WeekRouter);
router.use("/api/program", ProgramRouter)
router.use("/api/program-exercise", ProgramExerciseRouter)
router.use("/api/exercise-report", ExerciseReportRouter)
router.use("/api/exercise-category", ExerciseCategoryRouter)
router.use("/api/schedule", Schedule)
router.use("/api/program", ProgramRouter)
router.use("/api/join", JoinRouter)
router.use("/api/status", StatusRouter)

module.exports = router;
