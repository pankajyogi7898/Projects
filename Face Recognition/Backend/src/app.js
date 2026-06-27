require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const userRoute = require("./routes/auth.route")
const songRoute = require("./routes/song.route")
const cors = require("cors")

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", userRoute)
app.use("/api/songs", songRoute)


module.exports = app