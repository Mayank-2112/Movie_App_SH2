import { useState, useEffect } from "react";
import "./Register.css"; // Import the CSS file
import { Link } from "react-router-dom";

function Register() {
  // const [formData, setFormData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });
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

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "Carousel/DandW.jpg",
    "Carousel/DM4.jpeg",
    "Carousel/Elementals.png",
    "Carousel/FuriosaMadMAx.jpg",
    "Carousel/KPA.jpeg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="video-container">
      <video autoPlay muted loop className="background-video">
        <source src="bg-video/bg-vedio.mp4" type="video/mp4" />
      </video>
      <div className="card">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Carousel ${index}`}
          className={currentImageIndex === index ? "active" : "inactive"}
        />
      ))}
      <div className="login-prompt">
        <p id="login">Login</p>
        <input type="text" placeholder="username/email" />
        <input type="password" placeholder="password" />
        <p className="last-child">Not a member?</p>
        <button>Register</button>
      </div>
    </div>
    </div>
  );
}

export default Register;
