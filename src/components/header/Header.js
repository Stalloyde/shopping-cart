import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className='header'>
    <h1>ElectroTone Guitars</h1>
    <Link to='/'>
      <div>Home</div>
    </Link>
    <Link to='/catalog'>
      <div>Catalog</div>
    </Link>
    <Link to='/cart'>
      <div>Cart</div>
    </Link>
  </div>
);

export default Header;