import React from 'react';

const FilterList = ({ guitars }) => {
  const brandArray = guitars.map((item) => {
    return item.brand;
  });

  const uniqueBrands = brandArray.filter((brand, index) => {
    return brandArray.indexOf(brand) === index;
  });

  return (
    <ul>
      Filter by:
      <li>All brands</li>
      {uniqueBrands.map((brand) => (
        <li key={brand}>{brand}</li>
      ))}
    </ul>
  );
};

export default FilterList;
