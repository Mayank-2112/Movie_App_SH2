// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Home from "./Pages/Home/Home";
import BookNow from "./Pages/BookNow/BookNow";
import Summary from "./Pages/Summary/Summary";
import Seating from "./Pages/Seating/Seating";

import AdminRoutes from "./Pages/Admin/Admin";
import Dashboard from "./components/AdminComponents/Dashboards";

import Admin from "./Pages/Admin/Admin";


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

          {/* <AdminRoutes /> */}
          {/* <Route path="/admin" element={<Dashboard />} /> */}
          {AdminRoutes()}

          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/summary/:id" element={<Summary />}></Route>

        </Routes>
      </div>
      {/* <Register/> */}
    </Router>
  );
}

export default App;
