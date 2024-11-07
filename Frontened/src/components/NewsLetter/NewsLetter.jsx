import React, { useState } from 'react';
import axios from 'axios';

export default function NewsLetter() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Please enter a valid email.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/subscribe', { email });

      if (response.status === 200) {
        setMessage('Subscription successful! Check your email for recommended products.');
        setEmail(''); // Clear the email field after successful submission
      } else {
        setMessage('Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
      console.error('Error subscribing:', error);
    }
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg mx-auto mt-16 mb-16 w-full max-w-screen-lg">
      <h2 className="text-3xl md:text-4xl mb-4 text-center">Get Exclusive Offers On Your Email</h2>
      <p className="text-center mb-6 text-sm md:text-base">Subscribe to our newsletter and stay updated</p>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-4 rounded-md w-full md:w-80 lg:w-96 xl:w-[500px] md:mr-4"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300 h-14 w-full md:w-auto"
        >
          Subscribe
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm md:text-base text-green-500">{message}</p>
      )}
    </div>
  );
}