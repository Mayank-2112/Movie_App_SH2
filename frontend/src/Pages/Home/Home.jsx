import React from "react";
import Card from "../../components/Card/Card";
import NavBar from "../../components/NavBar/NavBar";
import KPA from "/Banner/KPA.jpeg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <NavBar />
      {/* <Banner /> */}
      <div className="hero">
        <img src={KPA} alt="" className="banner-img" />
        <div className="hero-caption">
          <p>Many years after the reign of Caesar, a young ape goes on a journey that will lead him to question everything he&apos;s been taught about the past and make choices that will define a future for apes and humans alike.</p>
          <div className="hero-btns">
            <button className="btn"><FontAwesomeIcon icon={faPlay} />Play</button>
            <button className="btn dark-btn"><FontAwesomeIcon icon={faCircleInfo} />More Info</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Home;
