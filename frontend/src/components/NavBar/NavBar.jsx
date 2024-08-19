import React from "react";
import Search from "../Search/Search";

const Navbar = ({ onSearch }) => {
  const hideNavbarPages = ["/login", "/register"];

  if (hideNavbarPages.includes(location.pathname)) {
    return null; // Hide Navbar on these pages
  }
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>MyApp</div>
      <Search onSearch={onSearch} />
      <div style={styles.menu}>Menu</div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  menu: {
    fontSize: "18px",
  },
};

export default Navbar;
