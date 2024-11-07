import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [ecoFriendly, setEcoFriendly] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/api/products', {
        params: { ecoFriendly }
      });
      setProducts(response.data);
    };

    fetchProducts();
  }, [ecoFriendly]);

  return (
    <div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={ecoFriendly}
            onChange={() => setEcoFriendly(!ecoFriendly)}
          />
          Eco-Friendly
        </label>
      </div>
      <div>
        {products.map(product => (
          <div key={product._id}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <p>{product.ecoFriendly ? 'Eco-Friendly' : 'Not Eco-Friendly'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
