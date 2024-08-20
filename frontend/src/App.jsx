// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/LoginPage/Login";
import Register from "./Pages/Register/Register";
import NavBar from "./components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
function App() {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // Add your search logic here
  };
  return (
    <Router>
      <div className="App">
        {/* <NavBar onSearch={handleSearch} /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Register/>
    </Router>
  );
}

export default App;
