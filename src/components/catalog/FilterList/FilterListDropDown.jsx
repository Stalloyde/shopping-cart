import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Catalog.module.css';

const FilterListDropDown = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

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
        setCategories(data);
        setErrorMessage(null);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    getAllCategories();
  }, []);

  if (isLoading) return <ul>Loading...</ul>;
  if (errorMessage) return <ul>{errorMessage}</ul>;

  function handleChange(value) {
    navigate(`${value}`);
    value = '';
  }

  return (
    <ul className={styles.filterListDropdown}>
      Filter by:
      <select onChange={(e) => handleChange(e.target.value)}>
        <option value='all products'>All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </ul>
  );
};

export default FilterListDropDown;
