import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [mensData, setMensData] = useState([]);
  const [womensData, setWomensData] = useState([]);
  const [kidsData, setKidsData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch mens data
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setMensData(Array.isArray(data) ? data : []))
      .catch(err => setError(err.message));
    
    // Fetch womens data
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setWomensData(Array.isArray(data) ? data : []))
      .catch(err => setError(err.message));
    
    // Fetch kids data
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setKidsData(Array.isArray(data) ? data : []))
      .catch(err => setError(err.message));
  }, []);

  const contextValue = {
    mensData,
    womensData,
    kidsData,
    error
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
