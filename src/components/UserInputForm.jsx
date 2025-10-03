import { useContext } from 'react';
import WeatherContext from '../WeatherContext.jsx';

import './UserInputForm.css';



export default function UserInputForm() {
  const { location, handleLocationChange, handleLocationSubmit, } = useContext(WeatherContext);

  return (
    <div className="userInputFormContainer">
      <form className="userInputForm" onSubmit={handleLocationSubmit}>
        <p>Please enter the location where you want to check the weather:</p>
        <input type='text' placeholder="Enter location" value={location} onChange={handleLocationChange} />
        <button type='submit'>Submit</button>
        {/* Or process location data internally and get the wether data by clicking the button */}
      </form>
    </div>
  );
}