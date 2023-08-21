import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = ({ cartArray }) => {
  const qtyInCart = () => {
    if (cartArray.length > 0) {
      const qtyArray = cartArray.map((item) => item.quantity);
      return qtyArray.reduce((total, current) => total + current);
    }

    return 0;
  };

  return (
    <header>
      <h1>ElectroTone Guitars</h1>
      <nav>
        <Link to='/'>
          <div>Home</div>
        </Link>
        <Link to='/catalog'>
          <div>Catalog</div>
        </Link>
        <Link to='/cart'>
          <div>Cart</div>
          <div className='cart-array'>{qtyInCart()}</div>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
