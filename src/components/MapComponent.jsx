// import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


// const GOOGLE_MAPS_API_KEY = 'AIzaSyBRu_j4eG0lvyDTx_GGc5nCR_DihgIt2MU'; 
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


export default function MapComponent(props) {
  const { lat, lon } = props;
  console.log("MapCompoonent lat: ", lat, " lon: ", lon);

  // lat, lon check
  if (!lat || !lon) {
    console.error("No location data for map!");
    return <div>No location data available...</div>;
  }

  // location data to provide to Google Maps app
  const location = {
    lat: lat,
    lng: lon, // Note: Google Maps API users 'lng' for longitude!!!
  };

  // style info to provide to Google Maps app
  const containerStyle = {
    width: '300px',
    height: '300px',
  };


  // JSX
  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={10}
      >
        {/* Maker at location */}
        <Marker position={location} />
      </GoogleMap>
    </LoadScript>
  );
};