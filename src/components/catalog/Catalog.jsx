import React, { useState, useEffect, useContext } from 'react';
import Header from '../header/Header';
import FilterList from './FilterList/FilterList';
import './Catalog.css';
import { Outlet } from 'react-router-dom';
import { CartContext } from '../../App';
import loading from '../../components/loading.gif';

const Catalog = () => {
  const { setProducts } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function getAllData() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');

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

    getAllData();
  }, []);

  return (
    <div className='catalog-container'>
      <Header />
      <FilterList />
      <main className='catalog-content'>
        <div className='products'>
          {isLoading ? (
            <img className='loading' src={loading}></img>
          ) : errorMessage ? (
            <p className='error'>{errorMessage}</p>
          ) : (
            <Outlet />
          )}
        </div>
      </main>
    </div>
  );
};

export default Catalog;
