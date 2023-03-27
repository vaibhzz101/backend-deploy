const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
    city:String,
    temperature: Number,
    humidity: Number,
    windSpeed: Number
});

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;