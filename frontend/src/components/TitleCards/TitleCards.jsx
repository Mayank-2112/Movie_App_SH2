import React from 'react';
import cards_data from './Cards_data';
import './TitleCards.css';

const TitleCards = () => {
  return (
    <div className="titlecards">
      <h2>Popular on Netflix</h2>
        <div className="card-list">
          {cards_data.map((card, index) => {
            return <div className="card" key= {index}>
              <img src={card.img} alt="Abcd" />
              <p>hljbfkljdehf {card.name}</p>
            </div>
          })}
        </div>  
    </div>
  )
}

export default TitleCards
