import React, { useState, useEffect } from "react";
import Search from "../Search/Search";
import { Link } from "react-router-dom";
import './NavBar.css';


// const Navbar = ({ onSearch }) => {
//   const hideNavbarPages = ["/login", "/register"];

//   // if (hideNavbarPages.includes(location.pathname)) {
//   //   return null; // Hide Navbar on these pages
//   // }

//   return (
//     <>
//     <nav style={styles.navbar}>
//       <div style={styles.logo}>FlickScribe</div>
//       <Search onSearch={onSearch} />
//       <div style={styles.menu}>Menu</div>
//     </nav>
//     {/* <p>Hi</p> */}
//     </>
//   );
// };

// const styles = {
//   navbar: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "10px 20px",
//     backgroundColor: "#333",
//     color: "#fff",
//   },
//   logo: {
//     fontSize: "24px",
//     fontWeight: "bold",
//   },
//   menu: {
//     fontSize: "18px",
//   },
// };

function Navbar() {
  const [click, setClick] = useState(true);
  const [button, setButton] = useState(true);
  const [navbar, setNavbar] = useState(false);

  // const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
    <nav className="navbar">
      <div className="site-title">
        <Link to='/' >FlickScribe</Link>
        </div>
        {/* <div className="menu-icon" onClick={handleClick}></div> */}
        {/* <ul className={click ? "nav-menu active" : "nav-menu"}> */}
        {/* <ul className="nav-menu"> */}
        
          <div className="nav-item i1">
            <Link to='/' onClick={closeMobileMenu}>
            Movies
            </Link>
          </div>
          {/* <li className="nav-item">
            <Link to='/' className="nav-links" onClick={closeMobileMenu}>
            Contact
            </Link>
          </li> */}
          <div className="nav-item i2">
            <Link to='/'  onClick={closeMobileMenu}>
            About_Us
            </Link>
          </div>
          <div className="nav-item i3">
            <Link to='/' onClick={closeMobileMenu}>
            Support
            </Link>
          </div>
          <div className="nav-item i3">
            <Link to='/' onClick={closeMobileMenu}>
            </Link>
          </div>
          <Search />
        {/* </ul> */}
    </nav>
    </>
  );
}

export default Navbar;