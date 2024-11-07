// src/pages/Login.jsx
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login(props) { // Accept props as a parameter
  const [isPassword, setIsPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const togglePassword = () => {
    setIsPassword(!isPassword);
  };

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is Required';
    if (!password) newErrors.password = 'Password is Required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      for (const error in newErrors) {
        toast.error(newErrors[error]);
      }
    } else {
      setErrors({});
      try {
        const data = { email, password };
        const response = await axios.post('http://localhost:5000/login', data, {
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.data.token) {
          // Store token and user data in localStorage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userData', JSON.stringify(response.data.user)); // Save user info (if any)

          toast.success('Logged in successfully!');
          props.onLogin(); // Call the handleLogin function from App.js
          navigate('/shop'); // Redirect after login
        } else {
          toast.error('Invalid email or password!');
        }
      } catch (error) {
        console.error('Error logging in:', error);
        toast.error('Error logging in! Please try again.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <img
            src="https://github.com/IsAmitprajapati/-Build-a-COMPLETE-Fullstack-ecommerce-Responsive-MERN-App-React-Redux-Nodejs-MongoDB-Express/blob/main/frontend/src/assest/login-animation.gif?raw=true"
            alt="Login Animation"
            className="mx-auto w-16 h-16 object-cover"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="example@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type={isPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="********"
          />
          <button
            type="button"
            onClick={togglePassword}
            className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            {isPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <div className="text-center mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
