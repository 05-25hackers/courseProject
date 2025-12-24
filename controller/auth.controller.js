const { User } = require("../models/users.model.js");
const jwt = require("jsonwebtoken");

const REGISTER = async (req, res) => {
  const { name, age, phone, password, role } = req.body;

  const user = await User.create({
    name,

    age,

    phone,

    password,

    role,
  });

  res.json({
    message: "User created",
    data: user,
  });
};

const LOGIN = async (req, res) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name, password });

  if (!user) return res.json({ message: "User not found" });

  const token = jwt.sign({ id: user._id, role: user.role }, "secret");

  res.json({ message: "Login success", token });
};

module.exports = {
  REGISTER,

  LOGIN,
};
