import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './Search.css';

function Search() {

  return (
    <>
    <div className="display">
            <input type="text" id="passw" placeholder="Search..."/>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
    </>
  );
};

export default Search;