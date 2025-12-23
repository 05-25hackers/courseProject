const mongoose = require('mongoose')

require(process.env.SECRET_KEY)

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    video_name: String,
    price: {
        type: Number, 
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },
    category: {
        type: mongoose.Types.ObjectId, 
        ref: "category"
    }
})

module.exports = {
  Course: mongoose.model("Course", courseSchema),
}
const Course = mongoose.model("course", courseSchema)

module.exports = { Course }
