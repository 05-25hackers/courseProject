const express = require('express')
const {LOGIN, REGISTER} = require('../controller/auth.controller.js')

const route = express.Router()

route.post('/login', LOGIN)
route.post('/register', REGISTER)

module.exports = route