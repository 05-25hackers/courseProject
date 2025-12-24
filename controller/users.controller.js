const { User } = require("../model/user.model.js");

const GET_USERS = async (req, res) => {
  const role = req.role;

  if (role !== "admin") {
    return res.json({ message: "Faqat admin ko'ra oladi" });
  }

  const users = await User.find();
  res.json({ message: "Success", data: users });
};

const DELETE_USER = async (req, res) => {
  const role = req.role;
  const { id } = req.params;

  if (role !== "admin") {
    return res.json({ message: "Faqat admin o'chira oladi" });
  }

  await User.findByIdAndDelete(id);
  res.json({ message: "Ochirildi" });
};

module.exports = { GET_USERS, DELETE_USER };
