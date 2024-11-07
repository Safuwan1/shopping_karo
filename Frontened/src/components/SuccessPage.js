import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  const goToShop = () => {
    navigate('/shop');
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Payment Successful!</h1>
      <p className="text-lg mb-6 text-center text-gray-600">Thank you for your purchase. Your payment was successful.</p>
      <button
        onClick={goToShop}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300"
      >
        Go to Shop
      </button>
    </div>
  );
};

export default SuccessPage;
