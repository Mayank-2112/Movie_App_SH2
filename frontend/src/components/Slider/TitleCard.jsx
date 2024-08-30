import React, { useEffect, useRef, useState } from "react";
import "./TitleCard.css";
import { Link } from "react-router-dom";

const TitleCard = ({title, category}) => {

  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDI5MjgxYjJjZWYzZjk1Nzg2OTY2OWE1Y2ZkZGYxNyIsIm5iZiI6MTcyNDk5NTU4Ny4wNDc3ODMsInN1YiI6IjY2Yzk1NTA3MjA1NzY2YTI4MmVhYWJlYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Zo9oZMkwVMBKRX_oaBhN3jvuUvJC54C2QzEK6SB7Ec0'
    }
  };
  


  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };
  // useEffect(() => {

  //   fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`)
  //   .then(response => response.json())
  //   .then(response => {
  //     setApiData(response.results);
  //     console.log(response.results); // Add this line
  //   })
  //   .catch(err => console.error(err));
    
  // }, []);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1&api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
        //https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&with_origin_country=IN --> For Indian
        const data = await response.json();
        // setMovieList(data.results.slice(0, 10)); // Use the first 3 movies
        setApiData(data.results);
        console.log(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    
    getMovies();
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);
  return (
    <div className="title-cards">
      <h2>{title?title:"Now Showing"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, indx) => {
          return (
            <Link to={`/summary/${card.id}`}>
            <div className="cardX" key={indx}>
              <img src={`https://image.tmdb.org/t/p/w500${card.poster_path}`} alt={card.title} />
              {/* <p>{card.original_title}</p> */}
            </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCard;
