import React, { useState, useEffect } from "react";
import Search from "../Search/Search";
import Profile from "../Profile/Profile";
import { Link } from "react-router-dom";
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretDown, faUser, faRightToBracket} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';

// function Navbar() {
//   const [click, setClick] = useState(true);
//   const [button, setButton] = useState(true);
//   const [navbar, setNavbar] = useState(false);

//   // const handleClick = () => setClick(!click);
//   const closeMobileMenu = () => setClick(false);

//   return (
//     <>
//     <nav className="navbar">
//       <div className="site-title">
//         <Link to='/' >FlickScribe</Link>
//         </div>
//         {/* <div className="menu-icon" onClick={handleClick}></div> */}
//         {/* <ul className={click ? "nav-menu active" : "nav-menu"}> */}
//         {/* <ul className="nav-menu"> */}
        
//           <div className="nav-item i1">
//             <Link to='/' onClick={closeMobileMenu}>
//             Movies
//             </Link>
//           </div>
          
//           {/* <li className="nav-item">
//             <Link to='/' className="nav-links" onClick={closeMobileMenu}>
//             Contact
//             </Link>
//           </li> */}

//           <div className="nav-item i2">
//             <Link to='/'  onClick={closeMobileMenu}>
//             About_Us
//             </Link>
//           </div>

//           <div className="nav-item i3">
//             <Link to='/' onClick={closeMobileMenu}>
//             Support
//             </Link>
//           </div>
          
//           <div className="search">
//             <Search />
//           </div>

//           <div className="profile">
//             <Profile />
//           </div>
          
//         {/* </ul> */}
//     </nav>
//     </>
//   );
// }

// export default Navbar;

function Navbar() {
  const {currentUser} = useSelector((state) =>state.user);
  console.log(currentUser);

  const handleDropdown = () => {
    const selectElement = document.querySelector(".select-item");
    selectElement.style.display = selectElement.style.display === "block" ? "none" : "block";
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.selector')) {
      document.querySelector(".select-item").style.display = "none";
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);





  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="site-title">FlixCribe</Link>
        <ul>
          <li>Movies</li>
          <li>Support</li>
          <li>Contact</li>
        </ul>
      </div>
      <div className="navbar-right">
        <Search />
      </div>
      {/* <div className="navbar-profile">
        <FontAwesomeIcon icon={faUser} className="profile" />
        <FontAwesomeIcon icon={faCaretDown}/>
        <div className="dropdown">
          <p>LogOut</p>
        </div>
      </div> */}
      {currentUser ? (
        <div className="selector">
          <div className="select" onClick={handleDropdown}>
            <img src={currentUser.profilePicture} alt="user" /></div>
          <div className="select-item">
            {currentUser.isAdmin ? (
              <div className="selected-item">Dashboard</div>
            ):(
              <div className="selected-item">Profile</div>
            )}
            <div className="selected-item">Logout</div>
          </div>
        </div>
      ):(
        <Link to='/login'>
          <button className="Btn-login"><FontAwesomeIcon icon={faRightToBracket} />Login</button>
        </Link>
      )}
    </div>
  );
}

export default Navbar;