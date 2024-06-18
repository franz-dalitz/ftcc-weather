
// requires
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const axios = require('axios');
const redis = require("redis");

// initialize express app
const app = express();
app.use(cors());

// set up redis connection
const cache = redis.createClient({
  url: `rediss://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD
});

// traditional constants
const PORT = 8080;
const EXPIRATION_SECONDS = 3600;

// route frontend weather requests to handler-like function
app.get('/:latitude/:longitude', async (req, res) => {
  res.send(await getWeatherData(req.params.latitude, req.params.longitude));
});

// weather fetching
async function getWeatherData(latitude, longitude) {
  // construct location / cache key from parameters
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
  const parameters = 't_2m:C,precip_1h:mm,wind_speed_10m:ms,sunset:sql'
  const url = `https://api.meteomatics.com/${datetime}/${parameters}/${location}/json`
  const response = await axios.get(url, {
    headers: {
      'Authorization': 'Basic ' + Buffer.from(process.env.METEO_USER + ':'
        + process.env.METEO_PASSWORD).toString('base64')
    }
  });

  // convert data from meteomatics' object to a simplified custom object
  data = {}
  response.data.data.forEach(element => {
    const dataKey = DATA_MAPPING[element.parameter];
    let value = element.coordinates[0].dates[0].value;
    if (dataKey == 'sunset') value = value.replace(/.*(..:..):00.*/, '$1');
    data[dataKey] = value;
  });
  console.debug(`meteomatics data: ${JSON.stringify(data)}`);

  // store data in redis and return it
  const status = await cache.set(location, JSON.stringify(data), { EX: EXPIRATION_SECONDS });
  cache.disconnect();
  console.debug(`redis status: ${status}`);
  return data;
}

const DATA_MAPPING = Object.freeze({
  't_2m:C': 'temperature',
  'precip_1h:mm': 'precipitation',
  'wind_speed_10m:ms': 'wind',
  'sunset:sql': 'sunset'
});

// start backend server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
