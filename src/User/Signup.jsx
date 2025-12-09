import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    image: null
  });

  const navigate = useNavigate(); // <-- useNavigate hook

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('username', formData.username);
      data.append('email', formData.email);
      data.append('password', formData.password);
      data.append('image', formData.image);

      await axios.post('http://localhost:3000/register', data);
      alert('Signup successful!');

      navigate('/dashboard'); // <-- redirect after successful signup
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || 'Signup failed.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Sign Up</h2>

        <input
          type="text"
          name="username"
          placeholder="Name"
          value={formData.username}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-4 px-3 py-2 border rounded"
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Sign Up
        </button>
        <a href="/login">Already have an account?</a>
      </form>
    </div>
  );
}

export default Signup;
