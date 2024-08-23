import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./BookNow.css";
import opencage from "opencage-api-client";
import TheaterDropdown from "../../components/TheaterDropdown/TheaterDropdown";

const BookNow = () => {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState({
    lat: "",
    lng: "",
  });

  // const [activeTime, setActiveTime] = useState(null);
  // const [showTimmings, setShowTimmings] = useState([]);

  const handleButtonClick = (e) => {
    setCity(e.target.value);
  };

  const getGeoLocation = async (e) => {
    e.preventDefault();
    console.log(city);
    try {
      const data = await opencage.geocode({
        q: city,
        key: import.meta.env.VITE_OPENCAGE_API_KEY,
      });
      if (data.status.code === 200 && data.results.length > 0) {
        const place = data.results[0];
        setLocation({
          lat: place.geometry.lat,
          lng: place.geometry.lng,
        });
        // getTheaters(place.geometry.lat,place.geometry.lng);
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

  // const handleactiveTheater = (idx) => {
  //   // console.log(key, buttonValues.key);
  //   setActiveTheater(idx);
  //   const selectedTheater = theater[idx];
  //   if (selectedTheater.showings && selectedTheater.showings.Standard) {
  //     setShowTimmings(selectedTheater.showings.Standard.times);
  //   } else {
  //     setShowTimmings([]);
  //     console.log("No showings available for the selected theater");
  //   }
  // };
  // const handleTimmingButton = (key) => {
  //   setActiveTime(key);
  // };

  return (
    <div className="main">
      <h1>Book Now</h1>
      <form onSubmit={getGeoLocation}>
        <input
          type="text"
          placeholder=" city names"
          id="city"
          value={city}
          onChange={handleButtonClick}
        />
        <button type="submit">Search</button>
      </form>
      <TheaterDropdown lat={location.lat} lng={location.lng} city={city} />

      <footer>
        <Link to="/seating">
          <button>select seat</button>
        </Link>
      </footer>
      <p>
        {city}
        {location.lat}
        {location.lng}
      </p>
      <div></div>
      <div>
        {/* {showTimmings &&
          showTimmings.map((timming, idx) => (
            <button
              key={idx}
              onClick={() => handleTimmingButton(idx)}
              style={{
                backgroundColor: activeTime === idx ? "blue" : "gray",
                color: "white",
                margin: "5px",
              }}
            >
              {timming.start_time}
            </button> */}
        {/* ))} */}
      </div>
    </div>
  );
};

export default BookNow;
