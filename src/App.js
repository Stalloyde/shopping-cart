import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Catalog from './components/catalog/Catalog';
import Home from './components/homepage/Home';
import Cart from './components/shopping-cart/Cart';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
