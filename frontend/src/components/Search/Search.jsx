import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './Search.css';

function Search() {

  const [input, setInput] = useState("");
  
  const fetchData = async (value) =>{
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(value)}&include_adult=false&language=en-US&page=1&api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
      const data = await response.json();
      console.log(data);
      
    } catch (error) {
      console.log(error);
      
    }
  }

//Twisters
  
  const handleClick = (e) =>{
    e.preventDefault();
    fetchData(input);
  }
    
  return (
    <>
    <div className="display">
            <form className="s-form" onSubmit={handleClick}>
            <input type="text" id="passw" placeholder="Search..." value={input} onChange={(e) => setInput(e.target.value)}/>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            </form>
        </div>
    </>
  );
};

export default Search;