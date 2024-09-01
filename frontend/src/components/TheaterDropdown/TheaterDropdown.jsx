import React, { useEffect, useState } from "react";
import "./TheaterDropdown.css";
import { useNavigate } from "react-router-dom";

const TheaterDropdown = ({ lat, lng, city, Activedate, id }) => {
  const [theater, setTheater] = useState([]);
  const [showTimings, setShowTimings] = useState([]);
  const [activeTimes, setActiveTimes] = useState({}); // Object to track active time per theater
  const navigate = useNavigate();
  const timings = {
    0: { hrs: "09", min: "15" },
    1: { hrs: "10", min: "00" },
    2: { hrs: "11", min: "40" },
    3: { hrs: "13", min: "05" },
    4: { hrs: "14", min: "15" },
    5: { hrs: "15", min: "45" },
    6: { hrs: "17", min: "20" },
    7: { hrs: "18", min: "35" },
    8: { hrs: "20", min: "00" },
    9: { hrs: "21", min: "30" },
    10: { hrs: "22", min: "20" },
  };

  useEffect(() => {
    const filterTimings = () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");
      const hours = String(currentDate.getHours()).padStart(2, "0");
      const minutes = String(currentDate.getMinutes()).padStart(2, "0");

      if (Activedate && Activedate.date === day && Activedate.month === month && Activedate.year === year) {
        const filteredTime = Object.values(timings).filter(
          (time) => time.hrs > hours || (time.hrs === hours && time.min >= minutes)
        );
        setShowTimings(filteredTime);
      } else {
        setShowTimings(Object.values(timings));
      }
    };

    filterTimings();
  }, [Activedate]);

  useEffect(() => {
    if (lat && lng) {
      getTheaters(lat, lng);
    }
  }, [lat, lng]);

  const getTheaters = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://api-gate2.movieglu.com/cinemasNearby/?n=30`,
        {
          method: "GET",
          headers: {
            client: "MOVI_231",
            "x-api-key": import.meta.env.VITE_X_API_KEY,
            authorization: import.meta.env.VITE_AUTHORIZATION,
            territory: "IN",
            "api-version": "v200",
            geolocation: `${lat};${lng}`,
            "device-datetime": new Date().toISOString(),
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        const filteredTheater = data.cinemas.filter(
          (theat) => theat.city === city
        );
        setTheater(filteredTheater);
      } else {
        console.error("HTTP error:", res.status, res.statusText);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleActiveTime = (theaterId, timeIndex) => {
    setActiveTimes((prevActiveTimes) => ({
      ...prevActiveTimes,
      [theaterId]: timeIndex,
    }));
    navigate(`/seating/${id}`)
  };
  
  return (
    <div className="theaterdropdown">
      {theater.map((theater, idx) => (
        <div className="theat-show" key={idx}>
          <div className="th-name">
            <h3>{theater.cinema_name}</h3>
            <h3>{theater.address}</h3>
          </div>
          <div className="th-show">
            {showTimings.length > 0 &&
              showTimings.map((time, timeIndex) => (
                <button
                  className="th-time"
                  key={timeIndex}
                  onClick={() => handleActiveTime(theater.cinema_id, timeIndex)}
                  style={{
                    background:
                      activeTimes[theater.cinema_id] === timeIndex
                        ? "#f1ee39"
                        : "rgba(255, 255, 255, 0.2)",
                    color:
                      activeTimes[theater.cinema_id] === timeIndex
                        ? "black"
                        : "#f1ee39",
                  }}
                >
                  {time.hrs}:{time.min}
                </button>
              ))}
          </div>
        </div>
      ))}

    </div>
  );
};

export default TheaterDropdown;
