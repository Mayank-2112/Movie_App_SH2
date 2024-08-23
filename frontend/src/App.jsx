// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import NavBar from "./components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import BookNow from "./Pages/BookNow/BookNow";
import Seating from "./Pages/Seating/Seating";
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
          <Route path="/booknow" element={<BookNow />}></Route>
          <Route path="/seating" element={<Seating />}></Route>
        </Routes>
      </div>
      {/* <Register/> */}
    </Router>
  );
}

export default App;
