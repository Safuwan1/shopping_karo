import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContexct'
import { CartContext } from '../CartContext/CartContext'; // Assume CartContext exists

export default function ProductDetail() {
  const { productId } = useParams();
  const { mensData, womensData, kidsData } = useContext(ShopContext);
  const { addToCart } = useContext(CartContext);

  const allProducts = [...mensData, ...womensData, ...kidsData];
  const product = allProducts.find(p => p.id === parseInt(productId, 10));

  if (!product) {
    return <div className="text-center text-gray-500">Product not found</div>;
  }

  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row">
        <img className="w-full md:w-1/2 h-80 object-cover" src={product.image} alt={product.title} />
        <div className="md:ml-6 mt-6 md:mt-0">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-4">${product.price}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <button onClick={handleAddToCart} className="bg-blue-500 text-white px-4 py-2 rounded">
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
        <div className="flex flex-wrap gap-4">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="bg-white shadow-lg rounded-lg overflow-hidden w-full sm:w-80 md:w-96 lg:w-1/4 p-4 m-2">
              <img className="w-full h-48 object-cover" src={relatedProduct.image} alt={relatedProduct.title} />
              <p className="mt-2 text-center font-semibold text-lg">{relatedProduct.title}</p>
              <p className="mt-2 text-center text-gray-600">${relatedProduct.price}</p>
              <a href={`/product/${relatedProduct.id}`} className="block text-center mt-2 text-blue-500">View Details</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}