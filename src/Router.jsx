import React, { useState, createContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/homepage/Home';
import Catalog from './components/catalog/Catalog';
import Electronics from './components/catalog/Categories/Electronics';
import Jewelery from './components/catalog/Categories/Jewelery';
import MensClothing from './components/catalog/Categories/MensClothing';
import WomensClothing from './components/catalog/Categories/WomensClothing';
import Cart from './components/shopping-cart/Cart';
import './Router.css';
import AllProducts from './components/catalog/Categories/AllProducts';

export const CartContext = createContext();

const Router = () => {
  const [products, setProducts] = useState([{}]);
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
        {
          path: 'all products',
          element: <AllProducts />,
        },
        {
          path: 'electronics',
          element: <Electronics />,
        },
        {
          path: 'jewelery',
          element: <Jewelery />,
        },
        {
          path: "men's clothing",
          element: <MensClothing />,
        },
        {
          path: "women's clothing",
          element: <WomensClothing />,
        },
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
        products,
        setProducts,
        quantityToAddToCart,
        setQuantityToAddToCart,
      }}
    >
      <RouterProvider router={router} />
    </CartContext.Provider>
  );
};

export default Router;
