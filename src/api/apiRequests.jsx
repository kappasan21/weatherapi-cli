import axios from 'axios';


// URL for local environment
// const serverURL = 'http://localhost:5201';
// URL for external environment on Render
const serverURL = 'https://weatherapi-svr.onrender.com';


// Fetch location candidate list data based on the use input data as city name
export async function getLocationData(cityName) {
  // Input check
  if (!cityName || cityName.trim() === '') {
    console.error('City name is required!');
    return;
  }

  try {
    console.log('Fetching location data for city: ', cityName);
    const result = await axios.get(serverURL + '/location/' + cityName);

    // Return the fetched location list data if any but return empty array if none
    if (result.data.length === 0) {
      console.error('No data found for the specified city');
      return [];
    } else {
      console.log('API call result: ', result.data);
      return result.data;
    }
  } catch (error) {
    console.error('Error fetching location data: ', error);
    return [];
  }
};


// Fetch weather data based on the detail location data with latitude and longitude
export async function getWeatherData(lat, lon) {
  // Input check
  if (!lat || !lon) {
    console.error('No location data');
    return;
  }

  try {
    console.log('Fetching weather data for lat: ', lat, ' lon: ', lon);
    const result = await axios.get(serverURL + '/weather/' + lat + '/' + lon);

    // return weather data if any but return empty object
    if (result.data.length === 0) {
      console.error('No weather data found for the specified locaton');
      return {};
    } else {
      console.log('Weater data: ', result.data);
      return result.data;
    }
  } catch (error) {
    console.error('Error fetching weather data: ', error);
    return {};
  }
};



// Check the connection with the weatherAPI-svr - since it is on Render with free plan, it is usualy on sleep mode, and takes time to wake it up. So, return the status of the server.
export async function checkWeatherServerHealth() {
  try {
    const result = await axios.get(serverURL + '/test/connection');
    console.log("Response from the server: ", result);
    if (result.data) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Failed to get the response from the server: ", error);
    return false;
  }
};