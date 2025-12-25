const { User } = require('../model/user.model.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()
require(process.env.SECRET_KEY)

const REGISTER = async (req, res) => {
	const { name, courses, age, phone, password, role } = req.body
	if (!(name && age && phone && password && role && courses))
		return res.json({
			message: 'Malumot kiritish shart',
		})

	const newUser = await User.create({
		name,
		age,
		phone,
		role,
		courses,
		password: await bcrypt.hash(password, 12),
	})
	return res.json({
		message: 'Successfully registered',
		newUser,
	})
}

const LOGIN = async (req, res) => {
	const { phone, password } = req.body
	let foundUser = await User.findOne({ phone })
	if (!foundUser) return res.json({ message: 'User not found' })
	const isCorrectPassword = bcrypt.compare(password, foundUser.password)
	if (!isCorrectPassword)
		return res.json({
			message: 'Wrong password',
		})
	const payload = {
		_id: foundUser._id,
		phone: foundUser.phone,
		name: foundUser.name,
	}
	const token = jwt.sign(payload, SECRET_KEY)
	res.json({
		message: 'Successfully logged in',
		token,
	})
}

module.exports = {
	LOGIN,
	REGISTER,
}
