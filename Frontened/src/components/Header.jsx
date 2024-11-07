import React, { useState, useContext } from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from './Assests/logo.png';
import cart_icon from './Assests/cart_icon.png';
import { CartContext } from '../CartContext/CartContext'; // Adjust path as needed

export default function Header({ isLoggedIn, onLogout }) {
  const [isMobile, setIsMobile] = useState(false);
  const [menu, setMenu] = useState('shop'); // Default to 'shop'
  const { getCartItemCount } = useContext(CartContext);

  const toggleMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <header className="w-full h-16 px-4 shadow-lg flex items-center justify-between bg-white drop-shadow-2xl z-50">
      <div className="flex-shrink-0 text-lg font-bold mx-8">
        <img src={logo} alt="Logo" className="h-full w-auto mx-8" />
      </div>
      <nav className="hidden md:flex flex-grow items-center justify-between mx-4">
        <ul className="flex gap-5 items-center justify-center flex-grow">
          <li 
            onClick={() => setMenu('shop')} 
            className={`relative hover:text-blue-500 hover:scale-105 transition duration-300 ease-in-out ${menu === 'shop' ? 'text-blue-500' : ''}`}
          >
            <Link to="/">Shop</Link>
            {menu === 'shop' && <hr className="absolute bottom-0 left-0 w-full border-t-2 border-blue-500 mt-1" />}
          </li>
          <li 
            onClick={() => setMenu('mens')} 
            className={`relative hover:text-blue-500 hover:scale-105 transition duration-300 ease-in-out ${menu === 'mens' ? 'text-blue-500' : ''}`}
          >
            <Link to="/mens">Mens</Link>
            {menu === 'mens' && <hr className="absolute bottom-0 left-0 w-full border-t-2 border-blue-500 mt-1" />}
          </li>
          <li 
            onClick={() => setMenu('womens')} 
            className={`relative hover:text-blue-500 hover:scale-105 transition duration-300 ease-in-out ${menu === 'womens' ? 'text-blue-500' : ''}`}
          >
            <Link to="/womens">Womens</Link>
            {menu === 'womens' && <hr className="absolute bottom-0 left-0 w-full border-t-2 border-blue-500 mt-1" />}
          </li>
          <li 
            onClick={() => setMenu('kids')} 
            className={`relative hover:text-blue-500 hover:scale-105 transition duration-300 ease-in-out ${menu === 'kids' ? 'text-blue-500' : ''}`}
          >
            <Link to="/kids">Kids</Link>
            {menu === 'kids' && <hr className="absolute bottom-0 left-0 w-full border-t-2 border-blue-500 mt-1" />}
          </li>
        </ul>
        <div className="flex gap-5 items-center ml-auto mx-8">
          {isLoggedIn ? (
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              Logout
            </button>
          ) : (
            <button className="hover:text-blue-500 transition duration-300 ease-in-out">
              <Link to="/login">Login</Link>
            </button>
          )}
          <Link to="/Cart" className="relative">
            <img src={cart_icon} alt="Cart" className="hover:text-blue-500 transition duration-300 ease-in-out" />
            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {getCartItemCount()}
            </div>
          </Link>
        </div>
      </nav>

      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu}>
          <FaBars className="text-2xl" />
        </button>
      </div>

      {isMobile && (
        <nav className="absolute top-16 left-0 w-full bg-white shadow-lg z-50 md:hidden">
          <ul className="flex flex-col items-center gap-5 py-4">
            <li 
              onClick={() => setMenu('shop')} 
              className={`relative hover:text-blue-500 hover:scale-105 transition duration-300 ease-in-out ${menu === 'shop' ? 'text-blue-500' : ''}`}
            >
              <Link to="/">Shop</Link>
              {menu === 'shop' && <hr className="absolute bottom-0 left-0 w-full border-t-2 border-blue-500 mt-1" />}
            </li>
            <li 
              onClick={() => setMenu('mens')} 
              className={`relative hover:text-blue-500 hover:scale-105 transition duration-300 ease-in-out ${menu === 'mens' ? 'text-blue-500' : ''}`}
            >
              <Link to="/mens">Mens</Link>
              {menu === 'mens' && <hr className="absolute bottom-0 left-0 w-full border-t-2 border-blue-500 mt-1" />}
            </li>
            <li 
              onClick={() => setMenu('womens')} 
              className={`relative hover:text-blue-500 hover:scale-105 transition duration-300 ease-in-out ${menu === 'womens' ? 'text-blue-500' : ''}`}
            >
              <Link to="/womens">Womens</Link>
              {menu === 'womens' && <hr className="absolute bottom-0 left-0 w-full border-t-2 border-blue-500 mt-1" />}
            </li>
            <li 
              onClick={() => setMenu('kids')} 
              className={`relative hover:text-blue-500 hover:scale-105 transition duration-300 ease-in-out ${menu === 'kids' ? 'text-blue-500' : ''}`}
            >
              <Link to="/kids">Kids</Link>
              {menu === 'kids' && <hr className="absolute bottom-0 left-0 w-full border-t-2 border-blue-500 mt-1" />}
            </li>
            <li className="relative hover:text-blue-500 hover:scale-105 transition duration-300 ease-in-out">
              <Link to="/Cart">
                <img src={cart_icon} alt="Cart" className="inline-block" />
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {getCartItemCount()}
                </div>
              </Link>
            </li>
            <li className="hover:text-blue-500 hover:scale-105 transition duration-300 ease-in-out">
              {isLoggedIn ? (
                <button
                  onClick={onLogout}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
