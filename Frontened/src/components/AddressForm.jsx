import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { CartContext } from '../CartContext/CartContext';

const AddressForm = () => {
  const { cart } = useContext(CartContext);

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const navigate = useNavigate();

  const stripePromise = loadStripe('pk_test_51PlmgsCRaWWPfJ2zXtlH5ffbPSzV8HaPZXfhBA2SbsmagJ97bnFkKZtY8EHrd6p7rOkJhSZz82zcA2LuMhQkdP6z00v0KaEcAN');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save address details in localStorage or state management solution
    // For example, using localStorage
    localStorage.setItem('address', JSON.stringify({ address, city, zip }));
    navigate('/payment');
  };

  const makePayment = async () => {
    try {
      const stripe = await stripePromise;

      if (!cart || cart.length === 0) {
        console.error('Cart is empty');
        return;
      }

      const body = {
        product: cart,
      };

      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await fetch('http://localhost:7000/api/create-checkout-session', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Error creating checkout session');
      }

      const session = await response.json();
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error);
      } else {
        console.log('Payment successful');
      }
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Shipping Address</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow-md rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="border rounded-lg w-full px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="border rounded-lg w-full px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Zip Code</label>
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
            className="border rounded-lg w-full px-3 py-2"
          />
        </div>
        <button
          type="submit" onClick={makePayment}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Continue to Payment
        </button><hr />
        {/* <button
          type="submit" onClick={()=>navigate(-1)}
          className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-700 transition-colors duration-300"
        >
          Go Back
        </button> */}
      </form>
    </div>
  );
};

export default AddressForm;