import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Product from './page/ProductDetail';
import Cart from './page/Cart';
import ShopCategory from './page/ShopCategory';
import Shop from './page/Shop';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import men_banner from './components/Assests/banner_mens.png';
import womens_banner from './components/Assests/banner_womens.png';
import kids_banner from './components/Assests/banner_kids.png';
import Signup from './page/Signup';
import Login from './page/Login';
import PrivateRoute from './components/PrivateRoute';
import Popular from './components/Popular/Popular';
import SuccessPage from './components/SuccessPage';
import CancelPage from './components/CancelPage'; 
import AddressForm from './components/AddressForm';
import PaymentPage from './components/PaymentPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  useEffect(() => {
    const status = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(status);
  }, []);

  const handleLogin = () => {
    console.log('Login handler called');
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <div className="bg-slate-100">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/shop" /> : <Navigate to="/login" />}
          />
          <Route
            path="/mens"
            element={isLoggedIn ? <ShopCategory banner={men_banner} category="mens" /> : <Navigate to="/login" />}
          />
          <Route
            path="/womens"
            element={isLoggedIn ? <ShopCategory banner={womens_banner} category="womens" /> : <Navigate to="/login" />}
          />
          <Route
            path="/kids"
            element={isLoggedIn ? <ShopCategory banner={kids_banner} category="kids" /> : <Navigate to="/login" />}
          />
          <Route
            path="/product/:productId"
            element={isLoggedIn ? <Product /> : <Navigate to="/login" />}
          />
          <Route
            path="/popular/:productId"
            element={isLoggedIn ? <Popular /> : <Navigate to="/login" />}
          />
          <Route
            path="/cart"
            element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
          />
          <Route
            path="/shop"
            element={isLoggedIn ? <Shop /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/shop" /> : <Login onLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/shop" /> : <Signup />}
          />
        <Route path="/address-form" element={<AddressForm />} />
         <Route path="/payment" element={<PaymentPage />} />
         <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} /> 
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
