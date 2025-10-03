import axios from 'axios';



const serverURL = 'http://localhost:5201';


export async function getLocationData(cityName) {
  // Input check
  if (!cityName || cityName.trim() === '') {
    console.error('City name is required!');
    return;
  }

  try {
    // const result = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=10&appid=${APIKEY}`);
    console.log('Fetching location data for city: ', cityName);
    const result = await axios.get(serverURL + '/location/' + cityName);

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


export async function getWeatherData(lat, lon) {
  // Input check
  if (!lat || !lon) {
    console.error('No location data');
    return;
  }

  try {
    // const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
    console.log('Fetching weather data for lat: ', lat, ' lon: ', lon);
    const result = await axios.get(serverURL + '/weather/' + lat + '/' + lon);

    if (result.data.length === 0) {
      console.error('No weather data found for the specified locaton');
      return [];
    } else {
      console.log('Weater data: ', result.data);
      return result.data;
    }
  } catch (error) {
    console.error('Error fetching weather data: ', error);
  }
};

