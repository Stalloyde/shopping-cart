import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Catalog from './components/Catalog';
import Home from './components/Home';

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalog' element={<Catalog />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
