import React, { useState, createContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Catalog from './components/catalog/Catalog';
import Home from './components/homepage/Home';
import Cart from './components/shopping-cart/Cart';
import './Router.css';

export const CartContext = createContext();
const Router = () => {
  const [cartArray, setCartArray] = useState([]);
  const [quantityToAddToCart, setQuantityToAddToCart] = useState(1);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/catalog',
      element: <Catalog />,
    },
    {
      path: '/cart',
      element: <Cart />,
    },
  ]);

  return (
    <CartContext.Provider
      value={{
        cartArray,
        setCartArray,
        quantityToAddToCart,
        setQuantityToAddToCart,
      }}
    >
      <RouterProvider router={router} />
    </CartContext.Provider>
  );
};

export default Router;
