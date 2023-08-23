import React, { useEffect, useState } from 'react';

const FilterList = ({ filterProducts }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getAllCategories() {
      const response = await fetch(
        'https://fakestoreapi.com/products/categories'
      );
      const data = await response.json();
      setCategories(data);
    }

    getAllCategories();
  }, []);

  // const brandArray = products.map((item) => {
  //   return item.brand;
  // });

  // const uniqueBrands = brandArray.filter((brand, index) => {
  //   return brandArray.indexOf(brand) === index;
  // });

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
