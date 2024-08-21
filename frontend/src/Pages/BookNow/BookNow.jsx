import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BookNow.css";

const BookNow = () => {
  const [theater, setTheater] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const buttonValues = {
    btn1: "9:00 AM - 12:00 PM",
    btn2: "1:00 PM - 4:00 PM",
    btn3: "5:00 PM - 8:00 PM",
    btn4: "9:00 PM - 12:00 AM",
  };

  const handleButtonClick = (key) => {
    console.log(key, buttonValues.key);

    setActiveButton(key);
  };

  return (
    <div className="main">
      <h1>Book Now</h1>
      <form
        onSubmit={() => {
          setTheater(true);
        }}
      >
        <input type="text" placeholder=" city names" />
        <button type="submit">Search</button>
      </form>
      {theater && <div className="theater">Theater</div>}
      <div className="time-slots">
        {Object.entries(buttonValues).map(([key, value]) => (
          <button
            key={key}
            onClick={() => handleButtonClick(key)}
            style={{
              backgroundColor: activeButton === key ? "blue" : "gray",
              color: "white",
              margin: "5px",
            }}
          >
            {value}
          </button>
        ))}
      </div>
      <footer>
        <Link to="/seating">
          <button>Select Seat</button>
        </Link>
      </footer>
    </div>
  );
};

export default BookNow;
