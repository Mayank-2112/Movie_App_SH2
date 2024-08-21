import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import "./Register.css";
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';

import { app }  from '../../firebase';

function Register() {
  
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth(app);
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
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ( !formData.fullname || !formData.email || !formData.password || !formData.confirmPassword) {
      return setError("Please fill all the fields!!");
    };
    if (formData.password !== formData.confirmPassword){
      return setError('Passwords do not match. Retry!!');
    };
    try {
      setError(null);
      const res = await fetch("/backend/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      }
      if (res.ok) {
        navigate("/login");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleClick = async(e)=>{
    const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt: 'select_account'});
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider);
            console.log(resultsFromGoogle);
            const res = await fetch('/backend/auth/google',{
                method: 'POST',
                headers: {'Content-Type': 'Application/json'},
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoURL: resultsFromGoogle.user.photoURL,
                }),
            });
            const data = await res.json()
            if(res.ok){
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }
  
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
          <div id="login">
            <p>Register</p>
          </div>
          <div className="buttons">
            <input type="text" placeholder=" Full name" id="fullname" onChange={handleChange} />
            <input type="email" placeholder=" Email" id="email" onChange={handleChange} />
            <input type="password" placeholder=" Password" id="password" onChange={handleChange} />
            <input type="password" placeholder=" Confirm password" id="confirmPassword" onChange={handleChange}/>
          </div>
          <div id="login-btn">
            <button className="btn" onClick={handleSubmit}>Register</button>
            <h6>
              <center>OR</center>
            </h6>
            <button className="google" onClick={handleGoogleClick}>
              <svg
                className="google-icon"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="10"
                height="10"
                viewBox="0 0 72 72"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              <span style={{ color: "white" }}>Sign Up with Google</span>
            </button>
          </div>
          <div className="last-child">
            <p>
              Already a member{" "}
              <Link to="/login">
                <span style={{ color: "#f1ee39", textDecoration: "none" }}>
                  Login
                </span>
              </Link>
            </p>
          </div>
          {
            error && <p className="error">{error}</p>
          }
        </div>
      </div>
    </div>
  );
}

export default Register;
