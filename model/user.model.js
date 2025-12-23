const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,

  password: {
    type: String,
    required: true,
  },
  phone: Number,

  role: {
    type: String,
    enum: ["admin", "user", "teacher"],
    default: "user",
  },

  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

module.exports = {
  User: mongoose.model("User", userSchema),
};
