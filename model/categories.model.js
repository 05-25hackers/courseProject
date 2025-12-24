const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
	title: String,
	description: String,
	courses: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'course',
		},
	],
})

module.exports = {
	Category: mongoose.model('category', categorySchema),
}
