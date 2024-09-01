import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { signOutSuccess } from '../../redux/user/userSlice.js';
import Search from "../Search/Search";

function Navbar({ onProfileClick, result }) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [scrollNav, setScrollNav] = useState(false);

  const handleDropdown = () => {
    const selectElement = document.querySelector(".select-item");
    selectElement.style.display = selectElement.style.display === "block" ? "none" : "block";
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.selector')) {
      document.querySelector(".select-item").style.display = "none";
    }
  };

  const changeNavBackground = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavBackground);
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("scroll", changeNavBackground);
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      const res = await fetch('/backend/user/signout', {
        method: 'POST'
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signOutSuccess());
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={`navbar ${scrollNav ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-left">
        <Link to="/" className="site-title">FlixCribe</Link>
        <ul>
          <li>Now Showing</li>
          <li>Upcoming</li>
        </ul>
      </div>
      <div className="navbar-right">
        <Search sitem={result} />
      </div>
      {currentUser ? (
        <div className="selector">
          <div className="select" onClick={handleDropdown}>
            <img src={currentUser.profilePicture} alt="user" />
          </div>
          <div className="select-item">
            {currentUser.isAdmin ? (
              <div className="selected-item trans">Dashboard</div>
            ) : (
              <div className="selected-item" onClick={onProfileClick}>Profile</div>
            )}
            <div className="selected-item" onClick={handleSignOut}>Logout</div>
          </div>
        </div>
      ) : (
        <Link to='/login'>
          <button className="Btn-login"><FontAwesomeIcon icon={faRightToBracket} />Login</button>
        </Link>
      )}
    </div>
  );
}

export default Navbar;
