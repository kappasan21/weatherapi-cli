import { useContext } from 'react';
import WeatherContext from '../WeatherContext.jsx';
import './LocationList.css';
import MapComponent from './MapComponent.jsx';



export default function LocationList() {
  const { locationList, setLocationList, handleWeatherDataFetch } = useContext(WeatherContext);

  // locationList check
  if (locationList.length === 0 || !locationList) {
    console.error("Location list is empty or not available.");
    setLocationList([]);
    return;
  }

  return (
    <div className="locationList">
      <h2>Location List:</h2>
      <p className="locationListExplanation">Search location result based on your search key.</p>
      <ul>
        {!locationList ? "" : locationList.map((location, index) => (
          <li key={index} className="locationItem" onClick={() => handleWeatherDataFetch(location)}>
            <h3>{location.name} - {location.country}</h3>
            <div className="locationInfoContainer">
              <p>lat: {location.lat}</p>
              <p>lon: {location.lon}</p>
            </div>

            <div id="google-map-container">
              <MapComponent lat={Number(location.lat)} lon={Number(location.lon)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};