import React, { useState, useEffect } from 'react';
import Card from './Card/Card';
import './Catalog.css';
import loading from '../../components/loading.gif';

const WomensClothing = () => {
  const [products, setProducts] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function fetchWomensClothing() {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/category/women's clothing"
        );

        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }

        const data = await response.json();
        setProducts(data);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWomensClothing();
  }, []);

  if (isLoading) return <img className='loading' src={loading}></img>;
  if (errorMessage) return <p className='error'>{errorMessage}</p>;

  return (
    <>
      {products.map((item) => (
        <Card
          products={products}
          key={`${item.id}-${item.title}`}
          productTitle={item.title}
          src={item.image}
          productPrice={item.price}
          id={item.id}
        />
      ))}
    </>
  );
};

export default WomensClothing;
