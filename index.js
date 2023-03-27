const express = require("express")
const app = express()
const {connection} = require("./config/db")
const{userRouter} = require("./routes/user.route")
const {weatherRouter} = require('./routes/weather.route')
const rateLimit = require('express-rate-limit')
const {client} = require("./redis")
require("dotenv").config()
app.use(express.json())


const limiter = rateLimit({
	windowMs: 3* 60 * 1000,
	max: 1, 
	standardHeaders: true, 
	legacyHeaders: false, 
})


const winston = require("winston")
const expressWinston = require("express-winston")
require("winston-mongodb")
app.use(expressWinston.logger({
    statusLevels:true,
    transports:[
        new winston.transports.MongoDB({
            level:true,
            db:process.env.mongoURL,
            collection:'logs',
            json:true
        })
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    )
}));


app.use(limiter)
app.use(weatherRouter)
app.listen(process.env.port, async()=>{
    try {
        await connection
        console.log("Connected to Database");
    } catch (error) {
        console.log("Error while connecting to Database");
    }
    console.log(`Server is running at port ${process.env.port}`)
})
