// src/components/Offer/Offer.js

import React from 'react';
import offer from '../Assests/offer.png';

export default function Offer() {
  return (
    <div className="w-full px-8 py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center">
        {/* Left Section - Text */}
        <div className="text-left lg:w-1/2 mb-8 lg:mb-0">
          <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mt-4">
            Exclusive <br /> Offers For You 
          </div>
          <div className="text-lg font-semibold text-gray-600 mt-4">ONLY ON BEST SELLERS PRODUCTS </div>
          <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg flex items-center hover:bg-blue-700 transition duration-300">
            Check Now 
          </button>
        </div>
        {/* Right Section - Image */}
        <div className="lg:w-1/2 flex justify-end lg:justify-end mb-auto">
          <img src={offer} alt="Exclusive Offers" className="w-full max-w-lg md:max-w-2xl lg:max-w-3xl " />
        </div>
      </div>
    </div>
  );
}
