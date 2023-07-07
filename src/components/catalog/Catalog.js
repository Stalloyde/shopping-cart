import React from 'react';
import Header from '../header/Header';
import FilterList from './FilterList/FilterList';
import Card from './Card/Card';
import './Catalog.css';
import { useState } from 'react';
import guitars from './guitars';

const Catalog = () => {
  const [cartArray, setCartArray] = useState([]);

  return (
    <div className='catalog-container'>
      <Header />
      <FilterList guitars={guitars} />
      <div className='catalog-content'>
        <div className='products'>
          {guitars.map((item) => (
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
