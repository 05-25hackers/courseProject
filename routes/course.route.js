const express = require('express')
const multer = require('multer')

const {
	GET_COURSES,
	CREATE_COURSE,
	UPDATE_COURSE,
	DELETE_COURSE,
} = require('../controller/courses.controller.js')
const { checkToken } = require('../middlewares/auth.middleware.js')
const route = express.Router()

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads')
	},
	filename: function (req, file, cb) {
		let mimetype = file.mimetype.split('/')[1]
		req.imgName = file.fieldname + '-' + Date.now() + '.' + mimetype
		cb(null, req.imgName)
	},
})

const uploads = multer({ storage: storage })
route.post('/course', checkToken, uploads.single('image'), CREATE_COURSE)
route.get('/course', GET_COURSES)
route.delete('/course/:id', checkToken, DELETE_COURSE)
route.put('/course/:id', checkToken, UPDATE_COURSE)
module.exports = route
