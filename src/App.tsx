import React, { useState, createContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/homepage/Home';
import Catalog from './components/catalog/Catalog';
import Electronics from './components/catalog/Categories/Electronics';
import Jewelery from './components/catalog/Categories/Jewelery';
import MensClothing from './components/catalog/Categories/MensClothing';
import WomensClothing from './components/catalog/Categories/WomensClothing';
import Cart from './components/shopping-cart/Cart';
import './App.css';
import AllProducts from './components/catalog/Categories/AllProducts';

export interface CartContextType {
  cartArray: CartArrayType[] | null;
  setCartArray: React.Dispatch<React.SetStateAction<CartArrayType[] | null>>;
  products: ProductsType[] | null;
  setProducts: React.Dispatch<React.SetStateAction<ProductsType[] | null>>;
  quantityToAddToCart: number;
  setQuantityToAddToCart: React.Dispatch<React.SetStateAction<number>>;
}

export interface CartArrayType {
  category: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
  id: number;
  rating: {};
  title: string;
}
[];

export interface ProductsType {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  quantity: number;
  rating: {};
  title: string;
}
[];

export const CartContext = createContext<CartContextType | null>(null);

const App = () => {
  const [products, setProducts] = useState<ProductsType[] | null>(null);
  const [cartArray, setCartArray] = useState<CartArrayType[] | null>(null);
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

export default App;
