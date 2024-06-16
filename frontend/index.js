
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
  button.setAttribute("aria-busy", true);
  const latitude = latitudeInput.value;
  const longitude = longitudeInput.value;
  const url = `http://${process.env.BACKEND_IP}:${process.env.BACKEND_PORT}/${latitude}/${longitude}`;
  for (const [key, value] of Object.entries((await axios.get(url)).data)) {
    TABLE_ELEMENTS[key].innerText = value;
  }
  button.setAttribute("aria-busy", false);
});
