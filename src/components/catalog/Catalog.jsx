import React from 'react';
import Header from '../header/Header';
import FilterList from './FilterList/FilterList';
import './Catalog.css';
import { Outlet } from 'react-router-dom';

const Catalog = () => {
  return (
    <div className='catalog-container'>
      <Header />
      <FilterList />
      <main className='catalog-content'>
        <div className='products'>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Catalog;
