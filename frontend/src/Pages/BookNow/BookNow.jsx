import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BookNow.css";
import opencage from 'opencage-api-client';

const BookNow = () => {
  const [city, setCity] = useState('');
  const [location, setLocation]= useState({
    lat:'',lng:''
  });
  const [theater, setTheater] = useState([]);
  const [activeTheater, setActiveTheater] = useState(null);
  const [activeTime, setActiveTime] = useState(null);
  const [showTimmings, setShowTimmings] = useState([]);

  const handleButtonClick = (e) => {
    setCity(e.target.value);
  };

  const getGeoLocation = async (e)=>{
    e.preventDefault();
    console.log(city);
    try {
      const data = await opencage.geocode({ q: city, key: import.meta.env.VITE_OPENCAGE_API_KEY });
      if (data.status.code === 200 && data.results.length > 0) {
        const place = data.results[0];
        setLocation({
          lat: place.geometry.lat,
          lng: place.geometry.lng
        });
        getTheaters(place.geometry.lat,place.geometry.lng);
      } else {
        console.log("Status", data.status.message);
        console.log("total_results", data.total_results);
      }
    } catch (error) {
      console.log("Error", error.message);
      if (error.status.code === 402) {
        console.log("hit free trial daily limit");
        console.log("become a customer: https://opencagedata.com/pricing");
      }
    }
    
  };
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  const filmId = '364605';
  
    const getTheaters = async (lat,lng)=>{
      try{
        const res = await fetch(`https://api-gate2.movieglu.com/cinemasNearby/?n=30`,{
            method: 'GET',
            headers:{
              'client' : 'MOVI_227',
              'x-api-key': import.meta.env.VITE_X_API_KEY,
              'authorization': import.meta.env.VITE_AUTHORIZATION,
              'territory': 'IN',
              'api-version': 'v200',
              'geolocation':`${lat};${lng}`,
              'device-datetime': `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`
            },

        });
        const data = await res.json();
        if (res.ok){
          console.log(data.cinemas);
          const filteredTheater = data.cinemas.filter(theat => theat.city === city);
          setTheater(filteredTheater);
        }
        else{
          console.error('HTTP error:', res.status, res.statusText);
          console.error('Response body:', data);
        }
      }catch(error){
        console.log(error.message);
        
      }
    };
    

    const handleactiveTheater = (idx) => {
      // console.log(key, buttonValues.key);
      setActiveTheater(idx);
      const selectedTheater = theater[idx];
    if (selectedTheater.showings && selectedTheater.showings.Standard) {
      setShowTimmings(selectedTheater.showings.Standard.times);
    } else {
      setShowTimmings([]);
      console.log("No showings available for the selected theater");
    }
    };
    const handleTimmingButton = (key)=>{
        setActiveTime(key);

    }
    
  return (
    <div className="main">
      <h1>Book Now</h1>
      <form onSubmit={getGeoLocation}>
        <input type="text" placeholder=" city names" id="city" value={city} onChange={handleButtonClick} />
        <button type="submit">Search</button>
      </form>
      


      <footer>
        <Link to="/seating">
          <button>select seat</button>
        </Link>
      </footer>
      <p>{city}
        {location.lat}
        {location.lng}
      </p>
      <div>
      {theater && (
          theater.map((theater, idx) => (
            <button key={idx}
            onClick={() => handleactiveTheater(idx)}
            style={{
              backgroundColor: activeTheater === idx ? "blue" : "gray",
              color: "white",
              margin: "5px",
            }}
            >
              {theater.cinema_name},{theater.address}</button>
          ))
        )}
      </div>
      <div>
      {showTimmings && (
          showTimmings.map((timming, idx) => (
            <button key={idx}
            onClick={() => handleTimmingButton(idx)}
            style={{
              backgroundColor: activeTime === idx ? "blue" : "gray",
              color: "white",
              margin: "5px",
            }}
            >
              {timming.start_time}</button>
          ))
        )}
      </div>
    </div>
  );
};

export default BookNow;
