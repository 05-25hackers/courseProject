const { Course } = require("../models/courses.model.js");
const { User } = require("../models/users.model.js");

const GET_COURSES = async (req, res) => {
  const data = await Course.find().populate("author").populate("category");

  res.json({
    message: "Success",
    data: data,
  });
};

const CREATE_COURSE = async (req, res) => {
  const { role, _id } = req.user;
  const { title, category } = req.body;

  if (role !== "teacher" && role !== "admin") {
    return res.json({
      message: "Sizga mumkin emas",
    });
  }

  const newCourse = await Course.create({
    title,
    category,
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
    return res.json({ message: "Ochirildi" });
  }

  if (role === "teacher" && course.author == _id) {
    await Course.findByIdAndDelete(id);
    return res.json
      ({ message: "Ochirildi" });
  }

  res.json({
    message: "Sizga mumkin emas",
  });
};

const UPDATE_COURSE = async (req, res) => {
  const { role } = req.user;

  
  const { id } = req.params;
  
  const { title, category } = req.body;

  const course = await Course.findById(id);

  if (!course) {
    return res.json({ message: "Kurs topilmadi" });
  }

  if (role === "admin") {
    const updated = await Course.findByIdAndUpdate(
      id,
      { title, category },
      { new: true }
    );
    return res.json({ message: "Yangilandi", data: updated });
  }

  if (role === "teacher" && course.author == _id) {
    const updated = await Course.findByIdAndUpdate(
      id,
      { title, category },
      { new: true }
    );
    return res.json({ message: "yangilandi", data: updated });
  }

  res.json({ message: "Sizga mumkin emassssss" });
};

module.exports = {
  GET_COURSES,
  CREATE_COURSE,
  DELETE_COURSE,
  UPDATE_COURSE,
};
