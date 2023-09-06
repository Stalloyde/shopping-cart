import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../Catalog.module.css';

const FilterList = () => {
  const [categories, setCategories] = useState(['']);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function getAllCategories() {
      try {
        const response = await fetch(
          'https://fakestoreapi.com/products/categories'
        );

        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }

        const data = await response.json();
        console.log(data);
        setCategories(data);
        setErrorMessage(null);
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getAllCategories();
  }, []);

  if (isLoading) return <ul>Loading...</ul>;
  if (errorMessage) return <ul>{errorMessage}</ul>;

  return (
    <ul className={styles.filterList}>
      Filter by:
      <li>
        <Link to='all products'>All Categories</Link>
      </li>
      {categories.map((category) => (
        <li key={category}>
          <Link to={`${category}`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default FilterList;
