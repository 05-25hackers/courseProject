const jwt = require("jsonwebtoken");
const { User } = require("../models/users.model.js");

const checkToken = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];

    if (!header) {
      return res.json({
        message: "Token berilmagan",
      });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, "secret");

    const userId = decoded.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.json({
        message: "Bunday user yoq",
      });
    }

    req.user = user;
    req.role = user.role;

    next();
  } catch (error) {
    return res.json({
      message: "Token xato",
    });
  }
};

module.exports = { checkToken };

