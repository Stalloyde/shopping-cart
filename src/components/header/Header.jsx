import React, { useContext } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Router';

const Header = () => {
  const { cartArray } = useContext(CartContext);

  const qtyInCart = () => {
    if (cartArray.length > 0) {
      const qtyArray = cartArray.map((item) => item.quantity);
      return qtyArray.reduce((total, current) => total + current);
    }

    return 0;
  };

  return (
    <header>
      <h1>Tech & Threads</h1>
      <nav>
        <Link className='home-nav' to='/'>
          <div>Home</div>
        </Link>
        <Link className='home-nav' to='/catalog/all products'>
          <div>Catalog</div>
        </Link>
        <Link className='home-nav' to='/cart'>
          <div>Cart</div>
          <div className='cart-array'>{qtyInCart()}</div>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
