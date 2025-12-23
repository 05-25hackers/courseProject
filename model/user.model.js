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

  courses: [{ type: mongoose.Types.ObjectId, ref: "Course" }],
});
let User = mongoose.model("User", userSchema)

module.exports = {
  User
};
