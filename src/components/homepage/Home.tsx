import React, { useContext } from 'react';
import Header from '../header/Header';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import { CartContext, CartContextType } from '../../App';

const Home = () => {
  const { cartArray } = useContext(CartContext) as CartContextType;
  return (
    <div className={styles.homeContainer} data-testid='homepage'>
      <Header />
      <main className={styles.homeMain}>
        Welcome to our online store, your one-stop destination for the latest
        trends and must-have items across four exciting categories. Explore our
        wide range of products in Electronics, Jewelry, Men's Clothing, and
        Women's Clothing to find the perfect addition to your collection.
        <br></br>
        <br></br>
        At our online store, we prioritize quality, style, and customer
        satisfaction. Each item is carefully selected to provide you with the
        best choices, ensuring that you find products that resonate with your
        individual taste. With a seamless shopping experience and secure
        checkout, you can shop with confidence and ease.
        <br></br>
        <br></br>
        Browse our four categories and discover the latest trends and timeless
        pieces that will transform your style and enhance your lifestyle. Happy
        shopping!
      </main>
      <aside className={styles.homeBtnContainer}>
        <Link className={styles.homeNav} to='/catalog/all products'>
          <div>View Our Collection</div>
        </Link>
      </aside>
    </div>
  );
};

export default Home;
