import React, { useState } from "react";
import "./Register.css"; // Import the CSS file
import {useNavigate} from 'react-router-dom';

function Register() {

  

    const [formData, setFormData] = useState({
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
    // console.log(formData);
    const handleSubmit = async (e)=>{
      e.preventDefault();
      if (!formData.fullname || !formData.email || !formData.password || !formData.confirmPassword){
        return setError('Please fill all the fields!!');
      }
      try {
        setError(null);
          const res = await fetch('/backend/auth/signup',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData),
          });
          const data = await res.json();
          console.log(data);
          if(data.success === false){
            setError(data.message);
          }
          if(res.ok){
            navigate('/login');
          }
      } catch (error) {
          setError(error.message);
      }
    }
  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
      </form>
      {/* <div>
        If u already have an account the{" "}
        <span>
          <Link to="/login">Login</Link>
        </span>
      </div> */}
    </div>
  );
}


export default Register;
