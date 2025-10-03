// import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';


const GOOGLE_MAPS_API_KEY = 'AIzaSyBRu_j4eG0lvyDTx_GGc5nCR_DihgIt2MU'; // Replace with your actual API key


export default function MapComponent(props) {
  const { lat, lon } = props;
  console.log("MapCompoonent lat: ", lat, " lon: ", lon);

  // lat, lon check
  if (!lat || !lon) {
    console.error("No location data for map!");
    return <div>No location data available...</div>;
  }

  const location = {
    lat: lat,
    lng: lon, // Note: Google Maps API users 'lng' for longitude!!!
  };

  const containerStyle = {
    width: '300px',
    height: '300px',
  };

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