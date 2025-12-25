const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
  title: String,
})

module.exports = {
  Category: mongoose.model("Category", categorySchema),
}
