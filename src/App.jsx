import UserInputForm from './components/UserInputForm.jsx';
import './App.css';
import WeatherContext from './WeatherContext.jsx';
import { useState, useEffect } from 'react';
import { getLocationData, getWeatherData, checkWeatherServerHealth } from './api/apiRequests.jsx';

import LocationList from './components/LocationList.jsx';
import ReportResult from './components/ReportResult.jsx';



export default function App() {

  const [location, setLocation] = useState(""); // location input by user
  const [locationList, setLocationList] = useState([]); // API will return location list data once sending the location data
  const [weatherData, setWeatherData] = useState([]); // API will return weather data once sending the location data
  const [serverStatus, setServerStatus] = useState(false);


  // Keep checking the server status until it becomes up
  useEffect(() => {
    console.log("The status check result: ", checkWeatherServerHealth());
    setServerStatus(checkWeatherServerHealth());
  }, []);



  // Get the user input data as location data
  function handleLocationChange(e) {
    console.log("Enter location data; ", e.target.value);
    setLocation(e.target.value);
  };


  // Submit the location data to fetch the location list data with API
  function handleLocationSubmit(e) {
    e.preventDefault();

    console.log("Submitted location: ", location);
    getLocationData(location)
      .then((data) => {
        console.log("Location data: ", data);
        setLocationList(data.result);
      }).catch((error) => {
        console.error("Error fetching location data:", error);
        setLocationList([]);
      });
  };


  const [isReportVisible, setIsReportVisible] = useState(false);
  // Submit the target location data to fetch the weather data with API
  function handleWeatherDataFetch(location) {
    const { lat, lon } = location;
    console.log("Selected location lat: ", lat, " lon: ", lon);
    getWeatherData(lat, lon)
      .then((data) => {
        console.log("Weather data: ", data);
        setWeatherData(data.result);

        if (data.result) {
          console.log("Show the report");
          setIsReportVisible(true);
        } else {
          console.log("Hide the report");
          setIsReportVisible(false);
        }

      }).catch((error) => {
        console.error("Error fetching weather data:", error);
        setWeatherData([]);
      });
  };


  // Reset weather report currently displaying and back to the page to ask the location
  function resetWeatherData(e) {
    e.preventDefault();

    setLocation("");
    setLocationList([]);
    setWeatherData([]);
    setIsReportVisible(false);
  };



  // Props to share within the context
  const weatherProps = {
    location,
    weatherData,
    locationList,
    setWeatherData,
    setLocationList,
    handleLocationChange,
    handleLocationSubmit,
    handleWeatherDataFetch,
    resetWeatherData,
  };

  return (
    <WeatherContext.Provider value={weatherProps}>
      <div>
        <h1>Weather Report APP</h1>
        <p id="version-info">server-client version</p>
        <p>Get the current weather information for any location in the world.</p>
        <h3 id="server-status">Server Status: {serverStatus ? "Ready!" : "Please wait for few minutes..."}</h3>

        {!isReportVisible && locationList.length === 0 ? <UserInputForm /> : ""}

        {locationList.length > 0 && !isReportVisible ? <LocationList /> : ""}

        {isReportVisible ? <ReportResult /> : ""}
      </div>
    </WeatherContext.Provider>
  );
};


