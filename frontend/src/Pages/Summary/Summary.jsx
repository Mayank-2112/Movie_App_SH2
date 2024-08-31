import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faPlay } from '@fortawesome/free-solid-svg-icons';
import Player from '../../components/Player/Player.jsx';
import Cast from '../../components/Cast/Cast.jsx';
import './Summary.css';

const Summary = () => {
  const { id } = useParams();
  const [mv_details, setMv_details] = useState([]);
  const [ytkey, setYtkey] = useState([]);
  const [cast, setCast] = useState([]);

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

  useEffect(() => {
    const getCast = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
        const data = await response.json();
        setCast(data.cast);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    getCast();
  }, [id]);


  useEffect(() => {
    const getYTKey = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US&api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
        const data1 = await response.json();
        setYtkey(data1.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    getYTKey();
  }, [id]);

  // console.log(ytkey[0]);
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
          <FontAwesomeIcon icon={faStar} /><p className="rating">{(Math.floor(mv_details.vote_average * 10)/10).toFixed(1)}</p>
          {/* <div className="gen">
            <button className="gen1">Crime</button>
          </div> */}
          </div>
          <p className="sd-overview">{mv_details.overview}</p>
          <div className="sd-btn">
            <Link to='/booknow'>
          <button className="btn-bknow"><FontAwesomeIcon icon={faPlay} />Book Now</button>
          </Link>
          </div>
        </div>
      </div>

      <div className="watch-trailer">
        <h1>Watch Trailer</h1>
      </div>

      <div className="sd-trailer">
        <Player yt_key={ytkey[0]}/>
      </div>

      <div className="cast-ttle">
        <h1>Cast</h1>
      </div>
      <div className="sd-cast">
        <Cast castList = {cast}/>
      </div>
      </div>
    </>
  );
};

export default Summary;
