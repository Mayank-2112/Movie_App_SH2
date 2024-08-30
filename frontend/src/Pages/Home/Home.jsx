import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from "../../components/NavBar/NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import './Home.css';
import TitleCard from '../../components/Slider/TitleCard';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const carouselRef = useRef(null);
  const slideInterval = useRef(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
        //https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&with_origin_country=IN --> For Indian
        const data = await response.json();
        setMovieList(data.results.slice(0, 10)); // Use the first 3 movies
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    getMovies();
  }, []);

  useEffect(() => {
    if (movieList.length > 0) {
      startAutoSlide();
    }
    return () => stopAutoSlide();
  }, [movieList]);

  const startAutoSlide = () => {
    slideInterval.current = setInterval(() => {
      handleNext();
    }, 10000);
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  const handleMouseDown = (e) => {
    stopAutoSlide();
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const diffX = currentX - startX;
    setTranslateX(diffX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (translateX > 60) {
      handlePrev();
    } else if (translateX < -60) {
      handleNext();
    }
    setTranslateX(0);
    startAutoSlide();
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  useEffect(() => {
    if (isTransitioning) {
      const transitionTimeout = setTimeout(() => {
        if (currentIndex === movieList.length) {
          setIsTransitioning(false);
          setCurrentIndex(0);
        } else if (currentIndex === -1) {
          setIsTransitioning(false);
          setCurrentIndex(movieList.length - 1);
        } else {
          setIsTransitioning(false);
        }
      }, 500);
      return () => clearTimeout(transitionTimeout);
    }
  }, [currentIndex, isTransitioning, movieList]);

  console.log(movieList);

  const currentSlide = movieList[(currentIndex + movieList.length) % movieList.length];

  // if (!currentSlide) return <div>Loading...</div>;

  // const handleSummary(()=>{

  // })

  return (
    <div className="home">
      <NavBar />
      <div className="hero"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}>
        <div
          className="carousel-slides"
          style={{
            transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
            transition: isDragging ? 'none' : 'transform 0.5s ease-in-out',
          }}
        >
          {movieList.map((slide, index) => (
            <div key={index} className="carousel-slide">
              <img src={`https://image.tmdb.org/t/p/original${slide.backdrop_path}`} alt={`Slide ${slide.original_title}`} className="banner-img" />
            
              <div className="hero-caption">
          <h3 className="caption-mvname">{currentSlide.title}</h3>
          <p>{currentSlide.overview}</p>
          <div className="hero-btns">
           <button className="btn"><FontAwesomeIcon icon={faPlay} />Book Now</button>
           <Link to={`/summary/${currentSlide.id}`}>
            <button className="btn dark-btn"><FontAwesomeIcon icon={faCircleInfo} />More Info</button>
           </Link>
          </div>
        </div>            
            </div>
          ))}
        </div>
        
      </div>
      <TitleCard title={'Now Showing'} category={'now_playing'} />
      <TitleCard title={'Upcoming'} category={'upcoming'} />
    </div>
  );
};

export default Home;
