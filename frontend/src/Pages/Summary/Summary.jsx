import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import './Summary.css';

const Summary = () => {
  const { id } = useParams(); // Destructure the id from useParams
  const [mv_details, setMv_details] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
        const data = await response.json();
        setMv_details(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    getMovies();
  }, [id]);

  console.log(mv_details);
  
  return (
    <>
    <div 
      className="sd-home"
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${mv_details.backdrop_path})`}}
    >
    </div>

    <div className="sd-above">
    <Link to ='/'>
      <FontAwesomeIcon icon={faArrowLeft} className="sd-back"/>
      </Link>
      <div className="sd-container">
        <div className="sd-poster">
          <img src={`https://image.tmdb.org/t/p/w500${mv_details.poster_path}`} alt={mv_details.title} />
        </div>
        <div className="sd-caption">
          <h3 className="sd-title">{mv_details.title}</h3>
          <div className="sd-genre">
          <FontAwesomeIcon icon={faStar} /><p className="rating">{mv_details.vote_average}</p>
          {/* <div className="gen">
            <button className="gen1">Crime</button>
          </div> */}
          </div>
          <p className="sd-overview">{mv_details.overview}</p>
          <div className="sd-btn">buttons here</div>
        </div>
      </div>
      <div className="sd-cast">Cast Cards</div>
      </div>
    </>
  );
};

export default Summary;
