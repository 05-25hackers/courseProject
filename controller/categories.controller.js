
const { Category } = require("../models/categories.model.js");



const GET_CATEGORIES = async (req, res) => {
  const data = await Category.find();

    res.json({

        message: "Success",

        data: data,

    });

};



const CREATE_CATEGORY = async (req, res) => {

    const { role } = req.user;

    const { title } = req.body;

  if (role !== "admin") {
    return res.json({ message: "faqat adminjon qosha oladi" });
  }

  const newCategory = await Category.create({ title });
  res.json({ message: "Qoshildi", data: newCategory });

};

const UPDATE_CATEGORY = async (req, res) => {
  const { role } = req.user;
  const { id } = req.params;
  const { title } = req.body;

  if (role !== "admin") {

      return res.json({ message: "faqat adminjon ozgartira oladi" });

  }

    
  const updated = await Category.findByIdAndUpdate(
    id,
    { title },
    { new: true }
  );
  res.json({ message: "Yangilandi", data: updated });
};

const DELETE_CATEGORY = async (req, res) => {

  const { role } = req.user;
  const { id } = req.params;

    if (role !== "admin") {
      
    return res.json({ message: "faqat adminjon ochira oladi" });
  }

  await Category.findByIdAndDelete(id);
  res.json({ message: "ochirildi" });
};

module.exports = {
  GET_CATEGORIES,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
};
