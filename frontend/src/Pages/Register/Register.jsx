import { useState } from "react";
import "./Register.css"; // Import the CSS file
import {Link} from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // const [error, setError] = useState("");

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Simple validation
  //   if (formData.password !== formData.confirmPassword) {
  //     setError("Passwords do not match.");
  //   } else {
  //     setError("");
  //     alert("Registration successful!");
  //     // Handle registration logic here, e.g., call an API
  //   }
  // };

  // const [movieList, setMovieList] = useState([])

  // const getMovie = () => {
  //   fetch('https://image.tmdb.org/t/p/w500//cyecB7godJ6kNHGONFjUyVN9OX5.jpg')
  //   .then(response => response.json())
  //   .then(json => setMovieList(json.results));
  // }

  return (
    <div className="register-container">
      <div className="card">
  <div className="box left">
    <div className="register-details"></div>
  </div>
  <div className="box right">
    <img src="public/banner/DM4.jpeg"/>
    <div className="login-prompt">
      <p>Already a member? <Link to="/login">Login here</Link></p>
    </div>
  </div>
</div>
    </div>
  );
}

export default Register;