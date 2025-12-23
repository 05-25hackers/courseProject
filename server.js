const express = require('express')
const { database } = require('./config/database.js')
const authRoute = require('./routes/auth.routes.js')
const courseRoute = require('./routes/courses.routes.js')

const app = express()

app.use(express.urlencoded())
app.use(express.json())

async function start() {
	await database()

	app.use('/auth', authRoute)

	app.use(courseRoute)

	app.listen(3000, () => console.log('http://localhost:3000'))
}
start()
