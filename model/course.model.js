const mongoose = require('mongoose')

require(process.env.SECRET_KEY)

const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
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

const Course = mongoose.model("course", courseSchema)

module.exports = { Course }