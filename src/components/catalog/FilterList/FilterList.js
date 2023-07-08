import React from 'react';

const FilterList = ({ guitars, filterBrand }) => {
  const brandArray = guitars.map((item) => {
    return item.brand;
  });

  const uniqueBrands = brandArray.filter((brand, index) => {
    return brandArray.indexOf(brand) === index;
  });

  return (
    <ul>
      Filter by:
      <li onClick={filterBrand}>All brands</li>
      {uniqueBrands.map((brand) => (
        <li key={brand} onClick={filterBrand}>
          {brand}
        </li>
      ))}
    </ul>
  );
};

export default FilterList;
