import React, { useState, useEffect, useContext } from 'react';
import Header from '../header/Header';
import FilterList from './FilterList/FilterList';
import FilterListDropDown from './FilterList/FilterListDropDown';
import styles from './Catalog.module.css';
import { Outlet } from 'react-router-dom';
import { CartContext, CartContextType } from '../../App';
import loading from '../../components/loading.gif';

const Catalog = () => {
  const { setProducts } = useContext(CartContext) as CartContextType;
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [resized, setResized] = useState(false);

  function handleResize() {
    window.innerWidth <= 950 ? setResized(true) : setResized(false);
  }

  window.addEventListener('resize', handleResize);

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
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getAllData();
  }, []);

  return (
    <div className={styles.catalogContainer}>
      <div>
        <Header />
      </div>
      {resized || window.innerWidth <= 950 ? (
        <FilterListDropDown />
      ) : (
        <FilterList />
      )}
      <main className={styles.catalogContent}>
        <div className={styles.products}>
          {isLoading ? (
            <img className={styles.loading} src={loading}></img>
          ) : errorMessage ? (
            <p className={styles.error}>{errorMessage}</p>
          ) : (
            <Outlet />
          )}
        </div>
        <a className={styles.linkToTop} href='#top'>
          ^ Back to Top
        </a>
      </main>
    </div>
  );
};

export default Catalog;
