import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => (
  <div className='header'>
    <h1>ElectroTone Guitars</h1>
    <div>
      <Link to='/catalog'>Catalog</Link>
    </div>
    <div>Cart</div>
  </div>
);

export default Header;
