import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCheckout = async () => {
      try {
        const stripe = await loadStripe('pk_test_51PlmgsCRaWWPfJ2zXtlH5ffbPSzV8HaPZXfhBA2SbsmagJ97bnFkKZtY8EHrd6p7rOkJhSZz82zcA2LuMhQkdP6z00v0KaEcAN');

        if (!stripe) {
          throw new Error('Stripe.js failed to load');
        }

        // Fetch session from the backend
        const response = await fetch('http://localhost:7000/api/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product: JSON.parse(localStorage.getItem('cart')),
          }),
        });

        // if (!response.ok) {
        //   throw new Error(`Failed to create checkout session: ${response.statusText}`);
        // }

        const session = await response.json();

        if (!session.id) {
          throw new Error('Checkout session ID not found');
        }

        // Redirect to Stripe checkout
        const result = await stripe.redirectToCheckout({ sessionId: session.id });

        if (result.error) {
          throw new Error(`Stripe Checkout Error: ${result.error.message}`);

        }
      } catch (error) {
        setError(error.message);
      }
    };

    handleCheckout();
  }, [navigate]);

  if (error) {
    return (
      <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Error</h1>
        <p className="text-center text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen flex items-center justify-center">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Redirecting to Payment...</h1>
      <p className="text-center text-gray-500">If the payment page does not load, please check the console for errors.</p>
    </div>
  );
};

export default PaymentPage;
