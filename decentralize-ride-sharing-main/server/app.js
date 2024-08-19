const express = require("express")
const cors = require('cors')

const app = express()
app.use(cors())
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }))
const userRoute = require('./routes/userRoutes')
const locationRoute = require('./routes/locationRoute')
const contactRoute = require("./routes/contactRoutes")
const vehicleRoute = require("./routes/vehicleRoutes")
const feedbackRoute = require("./routes/feedbackRoutes")


// const cookieParser = require('cookie-parser')
const cookieParser = require('cookie-parser')
app.use(cookieParser());
app.use(express.json())



app.use('/api/v1/users',userRoute)
app.use('/api/v1/feedback',feedbackRoute)

app.use('/api/v1/location',locationRoute)
app.use('/api/v1/contact',contactRoute)
app.use("/api/v1/vehicle",vehicleRoute)

module.exports = app
