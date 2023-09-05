import React, { useState, useContext } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { CartContext, CartContextType } from '../../App';
import menuIcon from '/menu-icon.svg';

const Header = () => {
  const [isMenuClick, setMenuClick] = useState(false);
  const { cartArray } = useContext(CartContext) as CartContextType;

  const qtyInCart = () => {
    if (cartArray && cartArray.length > 0) {
      const qtyArray = cartArray.map((item) => item.quantity);
      return qtyArray.reduce((total, current) => total + current);
    }

    return 0;
  };

  const NavWeb = ({ homeNav = 'homeNav' }) => {
    return (
      <div className={styles.navWeb}>
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
      </div>
    );
  };

  const DropDownMenu = () => {
    return (
      <nav className={styles.dropDownMenuNav}>
        <Link
          className={styles.mobileLink}
          to='/'
          onClick={() => {
            setMenuClick(!isMenuClick);
          }}
        >
          Home
        </Link>
        <Link
          className={styles.mobileLink}
          to='/catalog/all products'
          onClick={() => {
            setMenuClick(!isMenuClick);
          }}
        >
          Catalog
        </Link>
        <Link
          className={styles.mobileLink}
          to='/cart'
          onClick={() => {
            setMenuClick(!isMenuClick);
          }}
        >
          Cart <span className={styles.cartArray}>{qtyInCart()}</span>
        </Link>
      </nav>
    );
  };

  return (
    <header>
      <div className={styles.storeName}>
        <h1>Tech & Threads</h1>
      </div>
      <nav>
        <NavWeb />
        <div className={styles.navMobile}>
          <img src={menuIcon} onClick={() => setMenuClick(!isMenuClick)}></img>
          <div className={styles.cartArray}>{qtyInCart()}</div>
          {isMenuClick ? <DropDownMenu /> : null}
        </div>
      </nav>
    </header>
  );
};

export default Header;
