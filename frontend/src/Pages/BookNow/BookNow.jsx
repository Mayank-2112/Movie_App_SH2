import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./BookNow.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faPlay } from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';
import opencage from "opencage-api-client";
import TheaterDropdown from "../../components/TheaterDropdown/TheaterDropdown";
import BookNavbar from "../../components/BookNowNavbar/BookNavbar";

const BookNow = () => {
  const { id } = useParams();
  const {currentUser} = useSelector((state)=> state.user);
  const [location, setLocation] = useState({
    lat: "",
    lng: "",
  });
  console.log(currentUser);
  
  const [mv_details, setMv_details] = useState([]);
  const [mv_genre, setMv_genre] = useState([]);

  const [activeDay, setActiveDay] = useState(0);
  const [activeDate, setActiveDate] = useState(null);

  const days = ['SUN','MON','TUE','WED','THR','FRI','SAT'];
  const weekDates = [];
  const getWeekDates = () => {
    const today = new Date(); // Get today's date
    for (let i = 0; i < 7; i++) {
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
  
  useEffect(()=>{ 
    const getGeoLocation = async () => {
      try {
        const data = await opencage.geocode({
          q: currentUser.city,
          key: import.meta.env.VITE_OPENCAGE_API_KEY,
        });
        if (data.status.code === 200 && data.results.length > 0) {
          const place = data.results[0];
          setLocation({
            lat: place.geometry.lat,
            lng: place.geometry.lng,
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
    getGeoLocation();
    
  },[currentUser.city]);
    

    const handleDateChange = (key)=>{
        setActiveDay(key);
        setActiveDate(weekDates[key]);

    }
    useEffect(() => {
      const getMovies = async () => {
        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
          const data = await response.json();
          setMv_details(data);
          setMv_genre(data.genres); // Make sure this is "genres" instead of "genre"
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      };
  
      getMovies();
    }, [id]);
    
  return (
    <>
      <div className="bn-home"
        style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${mv_details.backdrop_path})`}}>
      </div>
      <div className="bn-above">
        <Link to={`/summary/${id}`}>
          <FontAwesomeIcon icon={faArrowLeft} className="bn-back-button"/>
        </Link>
        <div className="bn-container">
          <div className="row1">
            <div className="col1">
              <h1>{mv_details.title}</h1>
              <div className="bn-genre">
                <FontAwesomeIcon icon={faStar} className="bn-star" />
                <p className="rating">{(Math.floor(mv_details.vote_average * 10) / 10).toFixed(1)}</p>
                {mv_genre && mv_genre.length > 0 && mv_genre.map((genre, indexg) => (
                  <div className="gen" key={indexg}>
                    <p className="gen1">{genre.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col1">
              <h2>Select Date</h2>
              <div className="dateBtn">
                {weekDates && weekDates.map((item, index) => (
                  <button className="Btn" key={index} onClick={()=>handleDateChange(index)}
                    style={{background : index === activeDay ? '#f1ee39':'rgba(255, 255, 255, 0.2)',color: index === activeDay ? 'black':'#f1ee39'}}>
                      {item.day}, {item.date}
                  </button>
                  ))}
              </div>
            </div>
          </div>
          <div className="row2">
            <h2>Theaters and Showtimes</h2>
            <TheaterDropdown lat={location.lat} lng={location.lng} city={currentUser.city} Activedate={activeDate} id={id}/>
          </div>
        </div>
      </div>
      
      

      {/* <footer>
        <Link to="/seating">
          <button>select seat</button>
        </Link>
      </footer>
      <p>
        {city} -
        {" "}{location.lat},
        {" "}{location.lng}
        <br/>
      {activeDay && <span>{activeDate.date}</span> } </p> */}
    </>
  );
};

export default BookNow;
