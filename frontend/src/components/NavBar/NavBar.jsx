import React, { useState, useEffect } from "react";
import Search from "../Search/Search";
import Profile from "../Profile/Profile";
import { Link } from "react-router-dom";
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCaretDown, faUser} from '@fortawesome/free-solid-svg-icons';


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
      <div className="navbar-profile">
        {/* <img src="" alt="Profile" className="profile"/> */}
        <FontAwesomeIcon icon={faUser} className="profile" />
        <FontAwesomeIcon icon={faCaretDown}/>
        <div className="dropdown">
          <p>LogOut</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;