// Signup.js
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Signup() {
  const [isPassword, setIsPassword] = useState(false);
  const [isCPassword, setIsCPassword] = useState(false);
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const togglePassword = () => {
    setIsPassword(!isPassword);
  };

  const toggleCPassword = () => {
    setIsCPassword(!isCPassword);
  };

  const validate = () => {
    const newErrors = {};
    if (!fName) newErrors.fName = 'First Name is Required';
    if (!lName) newErrors.lName = 'Last Name is Required';
    if (!email) newErrors.email = 'Email is Required';
    if (!password) newErrors.password = 'Password is Required';
    if (password !== cPassword) newErrors.cPassword = 'Passwords do not match';
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
        const data = { fName, lName, email, password, cPassword };
        const response = await axios.post('http://localhost:5000/signup', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        toast.success(response.data.message);
        navigate('/login');
      } catch (error) {
        console.error(error);
        toast.error('Error signing up!');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <img
            src="https://github.com/IsAmitprajapati/-Build-a-COMPLETE-Fullstack-ecommerce-Responsive-MERN-App-React-Redux-Nodejs-MongoDB-Express/blob/main/frontend/src/assest/signup-animation.gif?raw=true"
            alt="Signup Animation"
            className="mx-auto w-16 h-16 object-cover"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fName" className="block text-gray-700 font-medium mb-1">First Name</label>
          <input
            type="text"
            id="fName"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.fName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="First Name"
          />
          {errors.fName && <p className="text-red-500 text-sm mt-1">{errors.fName}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="lName" className="block text-gray-700 font-medium mb-1">Last Name</label>
          <input
            type="text"
            id="lName"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lName ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Last Name"
          />
          {errors.lName && <p className="text-red-500 text-sm mt-1">{errors.lName}</p>}
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

        <div className="mb-4 relative">
          <label htmlFor="cPassword" className="block text-gray-700 font-medium mb-1">Confirm Password</label>
          <input
            type={isCPassword ? 'text' : 'password'}
            id="cPassword"
            value={cPassword}
            onChange={(e) => setCPassword(e.target.value)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cPassword ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="********"
          />
          <button
            type="button"
            onClick={toggleCPassword}
            className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            {isCPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.cPassword && <p className="text-red-500 text-sm mt-1">{errors.cPassword}</p>}
        </div>

        <div className="text-center mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
