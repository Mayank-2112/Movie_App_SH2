// import React from 'react';
import './Cast.css';

const Cast = ({ castList }) => {
  return (
    <div className="cast-container">
      {castList.slice(0, 10).map((castMember, index) => (
        <div key={index} className="cast-card">
          <div className="cast-image-container">
            <img src={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`} alt={castMember.name} className="cast-image" />
            <div className="cast-name-overlay">
              <p className="cast-name">{castMember.name}</p>
              <p className="char-name">{castMember.character}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cast;

