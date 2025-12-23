const { Course } = require("../models/courses.model.js");
const { User } = require("../models/users.model.js");

const GET_COURSES = async (req, res) => {
  const data = await Course.find().populate("author");

  res.json({
    message: "Success",
    data: data,
  });
};

const CREATE_COURSE = async (req, res) => {
  const { role, _id } = req.user;
  const { title } = req.body;

  if (role !== "teacher" && role !== "admin") {
    return res.json({
      message: "Sizga mumkin emas",
    });
  }

  const newCourse = await Course.create({
    title,
    author: _id,
  });

  await User.findByIdAndUpdate(_id, { $push: { courses: newCourse._id } });

  res.json({
    message: "Qoshildi",
    data: newCourse,
  });
};

const DELETE_COURSE = async (req, res) => {
  const { role, _id } = req.user;
  const { id } = req.params;

  const course = await Course.findById(id);

  if (!course) {
    return res.json({ message: "Kurs topilmadi" });
  }

  if (role === "admin") {
    await Course.findByIdAndDelete(id);
    return res.json({ message: "Ochirildi (Admin)" });
  }

  if (role === "teacher") {
    if (course.author.toString() === _id.toString()) {
      await Course.findByIdAndDelete(id);
      return res.json({ message: "Ochirildi (Teacher)" });
    } else {
      return res.json({ message: "Bu sizning kursingiz emas" });
    }
  }

  res.json({
    message: "Sizga mumkin emas",
  });
};

const UPDATE_COURSE = async (req, res) => {
  const { role } = req.user;
  const { id } = req.params;
  const { title } = req.body;

  if (role !== "admin") {
    return res.json({
      message: "Faqat admin ozgartira oladi",
    });
  }

  const updated = await Course.findByIdAndUpdate(id, { title }, { new: true });

  res.json({
    message: "Yangilandi",
    data: updated,
  });
};

module.exports = {
  GET_COURSES,
  CREATE_COURSE,
  DELETE_COURSE,
  UPDATE_COURSE,
};
