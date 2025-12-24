const express = require("express");
const { database } = require("./config/database.js");
const authRoute = require("./routes/auth.routes.js");
const courseRoute = require("./routes/courses.routes.js");
const categoryRoute = require("./routes/categories.route.js");
const userRoute = require("./routes/users.route.js");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function start() {
  await database();

  app.use("/auth", authRoute);
  app.use(courseRoute);
  app.use(categoryRoute);
  app.use(userRoute);

  app.listen(3000, () => console.log("http://localhost:3000"));
}
start();
