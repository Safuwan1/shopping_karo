import React from 'react';
import HeroImage from '../Assests/hero_image.png';
import hand_icon from '../Assests/hand_icon.png';
import { FaArrowRight } from 'react-icons/fa';

export default function Hero() {
  return (
    <div className="w-full px-8 py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center">
        <div className="text-left lg:w-1/2">
          <div className="text-lg font-semibold text-gray-600 px-2 ">NEW ARRIVALS ONLY</div>
          <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 mt-4 flex items-center">
            new <img src={hand_icon} alt="hand icon" className="w-12 h-12 mx-2" /> 
          </div>
          <div className='text-4xl sm:text-5xl md:text-6xl font-bold mt-2'>Collection</div>
          <div className="text-2xl sm:text-3xl md:text-4xl text-gray-600 mt-2">for everyone</div>
          <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg flex items-center hover:bg-blue-700 transition duration-300">
            Latest Collection <FaArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center lg:justify-end">
          <img src={HeroImage} alt="Hero" className="w-full max-w-lg md:max-w-2xl lg:max-w-3xl" />
        </div>
      </div>
    </div>
  );
}
