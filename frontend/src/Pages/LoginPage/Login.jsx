import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import "./Login.css";

function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Dummy login logic
  //   if (email === "user@example.com" && password === "password123") {
  //     alert("Login successful!");
  //   } else {
  //     setError("Invalid email or password.");
  //   }
  // };
  const [formData, setFormData]= useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]:e.target.value});
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if (!formData.email || !formData.password){
      return seterror('Please fill all the fields!!');
    }
    try {
      setError(null);
        const res = await fetch('/backend/auth/signin',{
          method:'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if(data.success === false){
          setError(data.message);
        }
        if(res.ok){
          navigate('/');
          
        }
    } catch (error) {
        setError(error.message);
    }
  }
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don&apos;t have an account? <Link to="/register">Register here</Link>.
      </p>
    </div>
  );
}

export default Login;
