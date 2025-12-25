const express = require("express");
const { database } = require("./config/database.js");
const authRoute = require("./routes/auth.route.js");
const courseRoute = require("./routes/course.route.js");
const userRoute = require("./routes/users.route.js");
const categoryRoute = require("./routes/categories.route.js");

const app = express();

app.use(express.urlencoded())
app.use(express.json())

async function start() {
  await database();

  app.use("/auth", authRoute);
  app.use(courseRoute);
  app.use(userRoute);
  app.use(categoryRoute);

  app.listen(3000, () => console.log("http://localhost:3000"));
}
start();
