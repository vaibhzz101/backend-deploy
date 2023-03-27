const express = require('express')
require('dotenv').config();
const ratelimit = require("express-rate-limit")
const logger = require('./logger/logger')

const authentication = require('./middleware/auth')
const limiter = require('./middleware/auth');
const logInvalidCity =  require('./middleware/auth')

const weatherRouter = require('./routes/weather.routes')
const app = express();
const connection = require('./config/db')

app.use(express.json())

app.use('/weather', weatherRouter)

app.use(authentication)
app.get('weather/:city', logInvalidCity, Cache)


app.listen(process.env.port, async()=>{
    console.log(`server is running at ${process.env.port}`)
    try{
        await connection
        console.log("db connected")
    }
    catch(err){
        console.log(err)
    }
})