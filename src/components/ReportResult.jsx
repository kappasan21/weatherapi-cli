import { useContext } from 'react';
import WeatherContext from '../WeatherContext.jsx';

import './ReportResult.css';


export default function ReportResult() {
  const { location, weatherData, resetWeatherData } = useContext(WeatherContext);

  console.log("Weather Data in ReportResult: ", weatherData);

  // Check if weatherData is available thought it is checked when it has fetched
  if (!weatherData) {
    return <div>No weather data available.</div>;
  }

  return (
    <div className="reportResultContainer">
      <h2>Weather Report</h2>
      <p>Location: {location}</p>
      <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="weather_icon" />
      <p>Weather: {weatherData.weather[0].main}</p>
      <p>Detail Weather: {weatherData.weather[0].description}</p>
      {/* <div>
        <p>Detail location: </p>
        <p>lat: {weatherData.coord.lat}</p>
        <p>lon: {weatherData.coord.lon}</p>
      </div> */}
      <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
      {/* <p>Max Temp: {(weatherData.main.temp_max - 273.15).toFixed(2)}°C</p>
      <p>Min Temp: {(weatherData.main.temp_min - 273.15).toFixed(2)}°C</p> */}
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      <p>Pressure: {weatherData.main.pressure} hPa</p>
      <button onClick={resetWeatherData}>Search Weather Again</button>
    </div>
  );
};