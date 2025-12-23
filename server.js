const express = require("express")
const {database} = require('./config/database.js')
const app = express()

app.use(express.urlencoded())
app.use(express.json())

async function start() {
    await database()



    app.listen(3000, () => console.log("http://localhost:3000"))
}
start()