import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Catalog from './components/catalog/Catalog';
import Home from './components/homepage/Home';
import Cart from './components/shopping-cart/Cart';
import './Router.css';

const Router = () => {
  const [cartArray, setCartArray] = useState([]);
  const [quantityToAddToCart, setQuantityToAddToCart] = useState(1);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Home
          cartArray={cartArray}
          setCartArray={setCartArray}
          quantityToAddToCart={quantityToAddToCart}
          setQuantityToAddToCart={setQuantityToAddToCart}
        />
      ),
    },
    {
      path: '/catalog',
      element: (
        <Catalog
          cartArray={cartArray}
          setCartArray={setCartArray}
          quantityToAddToCart={quantityToAddToCart}
          setQuantityToAddToCart={setQuantityToAddToCart}
        />
      ),
    },
    {
      path: '/cart',
      element: (
        <Cart
          cartArray={cartArray}
          setCartArray={setCartArray}
          quantityToAddToCart={quantityToAddToCart}
          setQuantityToAddToCart={setQuantityToAddToCart}
        />
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
