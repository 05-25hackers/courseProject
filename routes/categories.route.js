const express = require("express");
const {
  GET_CATEGORIES,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} = require("../controller/categories.controller.js");
const { checkToken } = require("../middlewares/auth.middleware.js");

const route = express.Router();

route.get("/categories", checkToken, GET_CATEGORIES);
route.post("/categories", checkToken, CREATE_CATEGORY);
route.put("/categories/:id", checkToken, UPDATE_CATEGORY);
route.delete("/categories/:id", checkToken, DELETE_CATEGORY);

module.exports = route;
