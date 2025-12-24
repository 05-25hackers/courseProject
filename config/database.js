const mongoose = require('mongoose')
require('dotenv').config()
async function database() {
	try {
		await mongoose.connect(process.env.DB)
		console.log('*Connected to DB')
	} catch (error) {
		console.log('DB error')
	}
}

module.exports = {
	database,
}
