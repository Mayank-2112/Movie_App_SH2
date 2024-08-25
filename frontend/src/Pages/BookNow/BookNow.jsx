import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BookNow.css";
import opencage from 'opencage-api-client';
import TheaterDropdown from "../../components/TheaterDropdown/TheaterDropdown";

const BookNow = () => {
  const [city, setCity] = useState('');
  const [location, setLocation]= useState({
    lat:'',lng:''
  });
  const [activeDay, setActiveDay] = useState(0);
  const [activeDate, setActiveDate] = useState(null);

  const days = ['SUN','MON','TUE','WED','THR','FRI','SAT'];
  const weekDates = [];
  const getWeekDates = () => {
    const today = new Date(); // Get today's date
    for (let i = 0; i < 10; i++) {
      const currentDate = new Date();
    
      currentDate.setDate(today.getDate() + i); // Add 'i' days to today
      const dayName = days[currentDate.getDay()]; // Get the day name
      const date = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = String(currentDate.getFullYear()).padStart(2, '0');
      weekDates.push({ day: dayName, date: date, month: month, year: year });
    }

    return weekDates;
  };
  getWeekDates();
  
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
    

    const handleDateChange = (key)=>{
        setActiveDay(key);
        setActiveDate(weekDates[key]);

    }
    
  return (
    <div className="main">
      <h1>Book Now</h1>
      {weekDates && weekDates.map((item, index) => (
          <button key={index} onClick={()=>handleDateChange(index)}
          style={{background : index === activeDay ? 'blue':'grey'}}>
            {item.day}, {item.date}
          </button>
        ))}




      <form onSubmit={getGeoLocation}>
        <input type="text" placeholder=" city names" id="city" value={city} onChange={handleButtonClick} />
        <button type="submit">Search</button>
      </form>
      <TheaterDropdown lat={location.lat} lng={location.lng} city={city} date={activeDate}/>
      

      <footer>
        <Link to="/seating">
          <button>select seat</button>
        </Link>
      </footer>
      <p>{city}
        {location.lat}
        {location.lng}
      </p>
      {activeDay && <p>{activeDate.date}</p> }
    </div>
  );
};

export default BookNow;
