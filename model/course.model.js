const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = {
  Course: mongoose.model("Course", courseSchema),
}