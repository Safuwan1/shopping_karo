import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../CartContext/CartContext';

// Add a simple loading spinner component
function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="border-t-4 border-blue-500 border-solid border-4 w-16 h-16 rounded-full animate-spin"></div>
    </div>
  );
}

// Function to check if an image URL is valid
const checkImage = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
};

export default function NewCollection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext); // Use CartContext
  const navigate = useNavigate(); // Use navigate for routing

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://api.escuelajs.co/api/v1/products');
        const validProducts = [];
        for (const product of res.data) {
          const isValid = await checkImage(product.images[0]);
          if (isValid) {
            validProducts.push(product);
          }
        }
        setProducts(validProducts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleImageClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="p-4">
      {loading ? (
        <LoadingSpinner /> // Show loading spinner while fetching data
      ) : (
        <ShowImage products={products} onImageClick={handleImageClick} />
      )}
    </div>
  );
}

function ShowImage({ products, onImageClick }) {
  const { addToCart } = useContext(CartContext); // Use CartContext

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-4xl font-bold mb-6">NEW COLLECTIONS</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden w-full sm:w-80 md:w-96 lg:w-1/4 p-4 m-2">
            <img
              className="w-full h-48 object-cover cursor-pointer"
              src={product.images[0]}
              alt={product.title}
              onClick={() => onImageClick(product)}
            />
            <p className="mt-2 text-center font-semibold text-lg">{product.title}</p>
            <p className="mt-2 text-center text-gray-600">${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
