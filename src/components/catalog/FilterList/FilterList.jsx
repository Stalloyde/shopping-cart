import React, { useEffect, useState } from 'react';

const FilterList = ({ filterProducts }) => {
  const [categories, setCategories] = useState([]);
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

  return (
    <ul>
      Filter by:
      <li onClick={filterProducts}>All Categories</li>
      {categories.map((brand) => (
        <li key={brand} onClick={filterProducts}>
          {brand.charAt(0).toUpperCase() + brand.slice(1)}
        </li>
      ))}
    </ul>
  );
};

export default FilterList;
