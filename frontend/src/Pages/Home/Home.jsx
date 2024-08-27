import React, { useState, useRef, useEffect } from 'react';
import Card from "../../components/Card/Card";
import NavBar from "../../components/NavBar/NavBar";
import KPA from "/banner/KPA.jpeg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import './Home.css';
import TitleCards from '../../components/TitleCards/TitleCards';
import { connectStorageEmulator } from 'firebase/storage';

const Home = () => {

  const [currentIndex, setCurrentIndex] = useState(1); // Start from index 1 because of the prepended clone
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [movieList, setMovieList] = useState([]);

  const slides = [
    { id: 1, path: 'https://image.tmdb.org/t/p/original/tabKOXkHRu6Nho2VOYrnyAirtY7.jpg'},
    { id: 2, path: 'https://image.tmdb.org/t/p/original/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg' },
    { id: 3, path: 'https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg' },
  ];

  const slideInterval = useRef(null);

  const extendedSlides = [
    slides[slides.length - 1],
    ...slides,
    slides[0],
  ];

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [currentIndex]);

  useEffect(() => {
    if (isTransitioning) return;

    if (currentIndex === 0) {
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(slides.length);
      }, 500);
    } else if (currentIndex === slides.length + 1) {
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(1);
      }, 500);
    }
  }, [currentIndex]);

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
    setIsTransitioning(false);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(false);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const getMovie = () =>{
  fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
    .then(response => response.json())
    .then(json => setMovieList(json.results.slice(0,3)))
    .catch(err => console.error(err));

    console.log(movieList);
  }

  useEffect(() =>{
    getMovie()
  },[])
  
  


  return (
    <div className="home">
      <NavBar />
      {/* <Banner /> */}
      <div className="hero" onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}>
        <div
        className="carousel-slides"
        style={{
          transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
          transition: isDragging || isTransitioning ? 'none' : 'transform 0.5s ease-in-out',
        }}
        onTransitionEnd={() => setIsTransitioning(false)}
      >
        {extendedSlides.map((slide, index) => (
          <div key={index} className="carousel-slide">
            <img src={slide.path} alt={`Slide ${slide.id}`} className="banner-img" />
          </div>
        ))}
      </div>
        <div className="hero-caption">
          <h3 className="caption-mvname" > Kingdom of the Planet of Apes</h3>
          <p>Many years after the reign of Caesar, a young ape goes on a journey that will lead him to question everything he&apos;s been taught about the past and make choices that will define a future for apes and humans alike.</p>
          <div className="hero-btns">
            <a href="http://localhost:5173/summary"><button className="btn"><FontAwesomeIcon icon={faPlay} />Book Now</button></a>
            <button className="btn dark-btn"><FontAwesomeIcon icon={faCircleInfo} />More Info</button>
          </div>
        </div>
      </div>
      <TitleCards />
    </div>
  )
};

export default Home;
