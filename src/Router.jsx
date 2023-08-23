import React, { useState, createContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/homepage/Home';
import Catalog from './components/catalog/Catalog';
import Electronics from './components/catalog/Electronics';
import Jewelery from './components/catalog/Jewelery';
import MensClothing from './components/catalog/MensClothing';
import WomensClothing from './components/catalog/WomensClothing';
import Cart from './components/shopping-cart/Cart';
import './Router.css';
import AllProducts from './components/catalog/AllProducts';

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
      path: 'catalog',
      element: <Catalog />,
      children: [
        { path: 'all products', element: <AllProducts /> },
        { path: 'electronics', element: <Electronics /> },
        { path: 'jewelery', element: <Jewelery /> },
        { path: "men's clothing", element: <MensClothing /> },
        { path: "women's clothing", element: <WomensClothing /> },
      ],
    },
    {
      path: 'cart',
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
