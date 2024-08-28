// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../../components/AdminComponents/Dashboards";
import Movies from "../../components/AdminComponents/Movie";
import ShowTimings from "../../components/AdminComponents/ShowTiming";
import Reservations from "../../components/AdminComponents/Reservations";

function Registrations() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/movies" element={<Movies />} />
        <Route path="/admin/show-timings" element={<ShowTimings />} />
        <Route path="/admin/reservations" element={<Reservations />} />
      </Routes>
    </Router>
  );
}

export default Registrations;
