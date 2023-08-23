import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import FilterList from './FilterList/FilterList';
import Card from './Card/Card';
import './Catalog.css';
import loading from '../../components/loading.gif';
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
