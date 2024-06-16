
// requires
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const redis = require("redis");

// initialization
const app = express();
const cache = redis.createClient({
  url: `rediss://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD
});

// traditional constants
const PORT = 8080;
const EXPIRATION_SECONDS = 3600;

// route frontend weather requests
app.get('/:latitude/:longitude', async (req, res) => {
  res.send(await getWeatherData(req.params.latitude, req.params.longitude));
});

// weather fetching function
async function getWeatherData(latitude, longitude) {
  // construct location
  const location = latitude + ',' + longitude;
  console.debug(`getting weather data for ${location}`);

  // connect to redis and return data if present
  await cache.connect();
  let data = await cache.get(location);
  if (data != null) {
    cache.disconnect();
    console.debug('returning data from cache');
    return data;
  }

  // in case nothing was cached get data from meteomatics
  console.debug('no data was found in cache for location, requesting data from meteomatics');
  const datetime = new Date().toISOString();
  const parameters = 'wind_speed_10m:ms,wind_dir_10m:d,t_2m:C,precip_1h:mm,sunrise:sql,sunset:sql,msl_pressure:hPa,weather_symbol_1h:idx'
  const url = `https://api.meteomatics.com/${datetime}/${parameters}/${location}/json`
  const response = await axios.get(url, {
    headers: {
      'Authorization': 'Basic ' + Buffer.from(process.env.METEO_USER + ':'
        + process.env.METEO_PASSWORD).toString('base64')
    }
  });

  // convert data from meteomatics' object to a simplified format
  data = {}
  response.data.data.forEach(element => {
    data[element.parameter] = element.coordinates[0].dates[0].value;
  });
  console.debug(`meteomatics data: ${JSON.stringify(data)}`);

  // store data in redis and return it
  const status = await cache.set(location, JSON.stringify(data), { EX: EXPIRATION_SECONDS });
  cache.disconnect();
  console.debug(`redis status: ${status}`);
  return data;
}

// start backend server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
