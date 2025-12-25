require("dotenv").config()
const mongoose = require("mongoose")

const DB = process.env.DB

async function database(){
    try {
        await mongoose.connect(DB)
        console.log("Connected to DB")
    } catch (error) {
        console.log("DB error:", error.message)
    }
}

module.exports = { database }
