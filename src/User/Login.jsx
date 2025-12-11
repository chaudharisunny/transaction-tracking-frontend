import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
function Login() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual axios call
      const response = await axios.post('http://localhost:3000/login', formData);
  
      
      // Save token and user to localStorage
      // After successful login
localStorage.setItem("user", JSON.stringify(response.data.user)); // `user` must contain username and image
localStorage.setItem("token", response.data.token);
navigate('/dashboard');

    } catch (error) {
      console.error("Login Error ", error);
      alert("Login failed");
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
          <a href="/register">create an new account</a>
        </form>
      </div>
    </div>
  );
}

export default Login;
