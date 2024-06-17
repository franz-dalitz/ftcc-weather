
// requires
require('dotenv').config();
const axios = require('axios').default;

// references
const placeDropdown = document.getElementById('place-dropdown');
const placeList = document.getElementById('place-list');
const latitudeInput = document.getElementById('latitude');
const longitudeInput = document.getElementById('longitude');
const button = document.getElementById('button');

const TABLE_ELEMENTS = Object.freeze({
  'temperature': document.getElementById('temperature'),
  'precipitation': document.getElementById('precipitation'),
  'wind': document.getElementById('wind'),
  'sunset': document.getElementById('sunset')
});

// traditional constants
const COORDINATES = Object.freeze({
  'Brandenburg an der Havel': ['52.4125', '12.5316'],
  'Potsdam': ['52.391842', '13.063561'],
  'Berlin': ['52.520008', '13.404954'],
  'Werder (Havel)': ['52.3648', '12.8701'],
  'Bad Belzig': ['52.1427', '12.5952'],
  'Rathenow': ['52.6048', '12.3379']
});

// insert coordinates when clicking place selection option
placeList.addEventListener('click', event => {
  const coordinates = COORDINATES[event.target.innerText];
  latitudeInput.value = coordinates[0];
  longitudeInput.value = coordinates[1];
  placeDropdown.open = false;
});

// call backend on confirmation to retrieve weather data
button.addEventListener('click', async () => {
  const latitude = latitudeInput.value;
  const longitude = longitudeInput.value;

  console.log(`attempting to fetch weather data for ${latitude},${longitude}`);

  if (!latitude.match(/^\d+\.*\d*$/) || !longitude.match(/^\d+\.*\d*$/)) {
    const msg = "latitude or longitude did not match coordinate format";
    alert(msg);
    console.log(msg);
    return;
  }

  button.setAttribute("aria-busy", true);
  const url = `http://${process.env.BACKEND_IP}:${process.env.BACKEND_PORT}/${latitude}/${longitude}`;
  let data;

  try {
    const response = await axios.get(url);
    data = response.data;
    console.log("data fetching was successful");
  }
  catch(err) {
    alert("failed to fetch weather data from server");
    console.log(err);
    button.setAttribute("aria-busy", false);
    return;
  }

  for (const [key, value] of Object.entries(data)) {
    TABLE_ELEMENTS[key].innerText = value;
  }

  button.setAttribute("aria-busy", false);
});
