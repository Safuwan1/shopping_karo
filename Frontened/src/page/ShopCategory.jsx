import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContexct'
import { Link } from 'react-router-dom'
export default function ShopCategory({ banner, category }) {
  const { mensData, womensData, kidsData, error } = useContext(ShopContext);

  let data;
  if (category === 'mens') {
    data = mensData;
  } else if (category === 'womens') {
    data = womensData;
  } else if (category === 'kids') {
    data = kidsData;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!data) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center">
      <img src={banner} alt={`${category} banner`} className="mb-6" />
      <div className="flex flex-wrap justify-center gap-4">
        {data.map(product => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden w-full sm:w-80 md:w-96 lg:w-1/4 p-4 m-2">
            <Link to={`/product/${product.id}`}>
              <img className="w-full h-48 object-cover" src={product.image} alt={product.title} />
            </Link>
            <p className="mt-2 text-center font-semibold text-lg">{product.title}</p>
            <p className="mt-2 text-center text-gray-600">${product.price}</p>
          </div>
         
        ))}
      </div>
    </div>
  );
}