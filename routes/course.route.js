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
	destination: function (req, file, cb){
		cb(null, 'uploads')
	},
	filename: function (req, file, cb){
		let mimetype = file.mimetype.split("/")[1]
		cb(null, file.fieldname + '-' + Date.now() + "." + mimetype)
	}
})

const uploads = multer({ storage: storage })
route.post('/post', checkToken, uploads.single('image'), CREATE_COURSE)
route.get('/post', GET_COURSES)
route.delete('/post/:id', checkToken, DELETE_COURSE)
route.put('/post/:id', checkToken, UPDATE_COURSE)
module.exports = route
