import React, { useContext } from 'react';
import { CartContext } from '../CartContext/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart } = useContext(CartContext);

  // Calculate total amount
  const totalAmount = cart ? cart.reduce((sum, product) => sum + product.price, 0) : 0;

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Your Cart</h1>
      {cart && cart.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty</p>
      ) : (
        <>
          <div className="flex flex-col gap-6">
            {cart && cart.map((product, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden p-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-4">
                  <img className="w-32 h-32 object-cover rounded-md border border-gray-300" src={product.image} alt={product.title} />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-700 truncate">{product.title}</h2>
                    <p className="text-gray-500 mt-1">${product.price.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Total: ${totalAmount.toFixed(2)}</h2>
            <Link to="/address-form">
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}