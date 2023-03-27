const redis = require('redis');
const axios = require("axios")

const client = redis.createClient({
    url: process.env.redisurl
})
client.on('error', (err)=> console.log(err.message));
(async () => await client.connect())()
client.on('ready', () => console.log('redis client connected'));

const cache = (req,res,next) =>{
    const city = req.params.city;
    client.get(`weather:${city}`, async(err, data)=>{
        if(data != null){
            res.send(data);
        }
        else{
            try{
                const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.weather_api_key}`);

                const weatherData = JSON.stringify(response.data);
                client.set(`weather:${city}`,weatherData, 'EX', 60*30);
                res.send(weatherData)

            } catch(error){
                logger.error(`Error getting weather data for ${city}: ${error.message}`);
                next(error)
            }
        }
    });
}
module.exports = client;