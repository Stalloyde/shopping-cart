import React, { useContext } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../../App';

const Header = ({ homeNav = 'homeNav' }) => {
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
      <div className={styles.storeName}>
        <h1>Tech & Threads</h1>
      </div>
      <nav>
        <Link className={styles[homeNav]} to='/'>
          <div>Home</div>
        </Link>
        <Link className={styles[homeNav]} to='/catalog/all products'>
          <div>Catalog</div>
        </Link>
        <Link className={styles[homeNav]} to='/cart'>
          <div>Cart</div>
          <div className={styles.cartArray}>{qtyInCart()}</div>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
