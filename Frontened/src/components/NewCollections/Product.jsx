import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Product() {
  const { state } = useLocation();
  const product = state?.product;

  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-4">
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
        <img className="w-full h-64 object-cover mb-4" src={product.images[0]} alt={product.title} />
        <p className="text-lg mb-4">{product.description}</p>
        <p className="text-xl font-semibold">${product.price}</p>
      </div>
    </div>
  );
}
