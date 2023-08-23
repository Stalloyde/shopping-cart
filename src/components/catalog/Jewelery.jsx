import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import FilterList from './FilterList/FilterList';
import Card from './Card/Card';
import './Catalog.css';
import loading from '../../components/loading.gif';

const Jewelery = () => {
  const [products, setProducts] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function fetchJewelery() {
      try {
        const response = await fetch(
          'https://fakestoreapi.com/products/category/jewelery'
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
    fetchJewelery();
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

export default Jewelery;
