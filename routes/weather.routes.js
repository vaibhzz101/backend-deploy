const express = require('express');
const {weather} = require("./model/weather.model.js")


const weatherRouter = express.Router();

weatherRouter.post('weather', async(req,res)=>{
    const {city, temperature, humidity, windSpeed} = req.body;

    const weather = new Weather({
        city,
        temperature,
        humidity,
        windSpeed
    });
    await weather.save()
    res.send(weather);
});


module.exports = {
    weatherRouter
}