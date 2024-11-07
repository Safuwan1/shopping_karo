import React, { createContext, useState } from 'react';

export const CartContext = createContext(null);

export const CartContextProvider = (props) => {
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (product) => {
    setCart(prevCart => [...prevCart, product]);
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Get total number of items in the cart
  const getCartItemCount = () => {
    return cart.length;
  };

  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    getCartItemCount,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};
