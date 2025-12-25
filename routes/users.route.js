const express = require("express");
const { GET_USERS, DELETE_USER } = require("../controller/users.controller.js");
const { checkToken } = require("../middlewares/auth.middleware.js");

const route = express.Router();

route.get("/users", checkToken, GET_USERS);
route.delete("/users/:id", checkToken, DELETE_USER);

module.exports = route;
