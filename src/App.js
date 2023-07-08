import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Catalog from './components/catalog/Catalog';
import Home from './components/homepage/Home';
import Cart from './components/shopping-cart/Cart';
import './App.css';

const App = () => {
  const [cartArray, setCartArray] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home cartArray={cartArray} />} />
        <Route
          path='/catalog'
          element={
            <Catalog cartArray={cartArray} setCartArray={setCartArray} />
          }
        />
        <Route
          path='/cart'
          element={<Cart cartArray={cartArray} setCartArray={setCartArray} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
