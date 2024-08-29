import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import './Summary.css';

const Summary = () => {

  const mv_id = useParams();

  const [mv_details, setMv_details] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${mv_id.id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
        const data = await response.json();
        setMv_details(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    getMovies();
  }, []);

  console.log(mv_details);
  
  return (
  <div className="sd-home">
    This is summary page.
    <div className="sd-container">
      <div className="sd-poster">
        <img src={`https://image.tmdb.org/t/p/w500${mv_details.poster_path}`} alt="" className="sd-img"/>
    </div>
    <div className="sd-caption">
      <h3 className="sd-title">
        Title Here
      </h3>
      <div className="sd-genre">
        genre here
      </div>
      <p>Overview here</p>
      <div className="sd-btn">
        buttons here
      </div>
    </div>
  </div>

  <div className="sd-cast">
    Cast Cards
  </div>

</div>
)
};

export default Summary;
