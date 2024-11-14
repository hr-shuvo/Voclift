// require("dotenv").config({path: '.env.example'});
require("dotenv").config();

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(bodyParser.json())

app.use(
    cors({
        origin:['http://localhost:3000', 'https://voclift.vercel.app'],
        credentials: true
    })
)


app.get("/", (req, res) => {
    res.send("Home Page");
})


const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`)
    })
}).catch((err) => console.warn(err))