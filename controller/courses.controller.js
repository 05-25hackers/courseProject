const { User } = require('../model/user.model.js')
const { Course } = require('../model/course.model.js')
const { Category } = require('../model/categories.model.js')

const GET_COURSES = async (req, res) => {
	const data = await Course.find().populate('user').populate('category').exec()
  console.log(data)
	return res.json({
		message: 'Success',
		data,
	})
}

const CREATE_COURSE = async (req, res) => {
	if (req.role === 'admin') {
		let reqBody = req.body


		const { name, description, price, categoryId } =
			reqBody
		const userId = req.user._id
		const newData = await Course.create({
			name,
			description,
			price,
			category: categoryId,
			user: userId,
		})
		await User.findByIdAndUpdate(
			{ _id: userId },
			{ $push: { course: newData } },
		)
    		await Category.findByIdAndUpdate(
			{ _id: categoryId },
			{ $push: { courses: newData } },
		)
		return res.json({
			message: 'Success',
			data: newData,
		})
	}
}

const UPDATE_COURSE = async (req, res) => {
	if (role === '/admin') {
		const { id } = req.params
		const { name, video_name, price, category } = req.body
		const data = await Post.findByIdAndUpdate(
			id,
			{ name, video_name, price, category },
			{ new: true },
		)
		res.json({
			message: 'Yangilandi',
			data: data,
		})
	}
}

const DELETE_COURSE = async (req, res) => {
	if (role === '/admin') {
		const { id } = req.params
		await Course.findByIdAndDelete(id)
		await User.findByIdAndUpdate(req.user._id, { $pull: { posts: id } })
		res.json({
			message: "O'chirildi",
		})
	}
}

module.exports = {
	GET_COURSES,
	CREATE_COURSE,
	UPDATE_COURSE,
	DELETE_COURSE,
}
