import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './Search.css';

function Search() {

  const [input, setInput] = useState("");
  
  const fetchData = (value) =>{
    fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(value)}&include_adult=false&language=en-US&page=1&api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
    .then(response => response.json)
    .then(json => console.log(json))
    .catch(err => console.error(err))
  }

//Twisters
  
  const handleClick = () =>{
    fetchData(input);
  }
    
  return (
    <>
    <div className="display">
            <form action="" className="s-form" onSubmit={handleClick}><input type="text" id="passw" placeholder="Search..." value={input} onChange={(e) => setInput(e.target.value)}/>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            </form>
        </div>
    </>
  );
};

export default Search;