import React from 'react';
import Header from '../header/Header';
import FilterList from './FilterList/FilterList';
import Card from './Card/Card';
import './Catalog.css';
import { useState } from 'react';
import guitars from './guitars';

const Catalog = ({
  cartArray,
  setCartArray,
  quantityToAddToCart,
  setQuantityToAddToCart,
}) => {
  const [brandFiltered, setBrandFiltered] = useState([]);

  const filterBrand = (e) => {
    const filteredGuitars = guitars.filter((guitar) => {
      if (e.target.textContent === guitar.brand) {
        return guitar;
      }
    });
    setBrandFiltered(filteredGuitars);
  };

  return (
    <div className='catalog-container'>
      <Header cartArray={cartArray} />
      <FilterList guitars={guitars} filterBrand={filterBrand} />
      <div className='catalog-content'>
        <div className='products'>
          {brandFiltered.length > 0
            ? brandFiltered.map((item) => (
                <Card
                  guitars={guitars}
                  key={item.model}
                  guitarModel={item.model}
                  src={item.imageSrc}
                  width={item.width}
                  height={item.height}
                  guitarPrice={item.price}
                  id={item.id}
                  cartArray={cartArray}
                  setCartArray={setCartArray}
                  quantityToAddToCart={quantityToAddToCart}
                  setQuantityToAddToCart={setQuantityToAddToCart}
                />
              ))
            : guitars.map((item) => (
                <Card
                  guitars={guitars}
                  key={item.model}
                  guitarModel={item.model}
                  src={item.imageSrc}
                  width={item.width}
                  height={item.height}
                  guitarPrice={item.price}
                  id={item.id}
                  cartArray={cartArray}
                  setCartArray={setCartArray}
                  quantityToAddToCart={quantityToAddToCart}
                  setQuantityToAddToCart={setQuantityToAddToCart}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
