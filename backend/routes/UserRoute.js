const express = require("express");
const UserRouter = express.Router();
const UsersController = require("../controllers/UserController");

UserRouter.get("/:id", UsersController.getUserbyId);
UserRouter.put("/", UsersController.updateUser);
UserRouter.get("/", UsersController.getUserLogin);

module.exports = UserRouter;
