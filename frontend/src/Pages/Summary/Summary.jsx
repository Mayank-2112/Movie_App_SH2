import React from "react";
import './Summary.css';

const Summary = () => {
  return (
  <div className="sd-home">
    This is summary page.
    <div className="sd-container">
      <div className="sd-poster">
        Poster_path
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
