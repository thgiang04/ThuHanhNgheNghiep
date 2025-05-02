const express = require("express");

const { createUser, getAllUser, getUserById, updateUserById, deleteUserById } = require("../controller/userController.js");

const route = express.Router();

route.post("/user", createUser);
route.get("/user", getAllUser);
route.get("/user/:id",getUserById)
route.put("/user/:id",updateUserById)
route.delete("/user/:id",deleteUserById)
module.exports = route;
