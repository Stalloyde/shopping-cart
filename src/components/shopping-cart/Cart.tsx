import React, { useContext } from 'react';
import Header from '../header/Header';
import styles from './Cart.module.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../../App';

export const CartGrids = ({ cartItem }) => {
  const { cartArray, setCartArray, setQuantityToAddToCart } =
    useContext(CartContext);

  const handleChange = (e) => {
    cartItem.quantity = Number(e.target.value);
    setQuantityToAddToCart(cartItem.quantity);
  };

  const handleDelete = (e) => {
    const copy = [...cartArray];
    const updatedCopy = copy.filter((item) => item.id !== Number(e.target.id));
    setCartArray([...updatedCopy]);
  };

  return (
    <article className={styles.cartContent}>
      <div className={styles.cartImageContainer}>
        <img src={cartItem.image} alt={cartItem.title}></img>
      </div>
      <section className={styles.cartDetails}>
        <div>
          <h3>{cartItem.title}</h3>
        </div>
        <div>{`Price: $${cartItem.price}`}</div>
        <div>
          Quantity:{' '}
          <input
            type='number'
            defaultValue={cartItem.quantity}
            min='1'
            onChange={handleChange}
          ></input>
        </div>
        <div>
          Subtotal: {`$${(cartItem.price * cartItem.quantity).toFixed(2)}`}
        </div>
        <div className={styles.cartDelete}>
          <button id={cartItem.id} onClick={handleDelete}>
            Remove Item
          </button>
        </div>
      </section>
    </article>
  );
};

const Cart = () => {
  const { cartArray } = useContext(CartContext);

  const sum = () => {
    const pricexQuantityArray = cartArray.map(
      (item) => item.price * item.quantity
    );
    return pricexQuantityArray
      .reduce((total, current) => total + current)
      .toFixed(2);
  };

  return (
    <>
      <Header cartArray={cartArray} />
      <main className={styles.cartContainer}>
        {cartArray.length === 0 ? (
          <>
            <aside className={styles.homeBtnContainer}>
              Your shopping cart is currently empty.
              <br />
              <br />
              <Link className={styles.homeNav} to='/catalog/all products'>
                <div>View Our Collection</div>
              </Link>
            </aside>
          </>
        ) : (
          <>
            <section className={styles.cartGridsContainer}>
              {cartArray.map((cartItem) => (
                <CartGrids
                  cartItem={cartItem}
                  key={`${cartItem.id}-${cartItem.title}`}
                  id={cartItem.id}
                />
              ))}
            </section>
            <footer className={styles.checkoutContainer}>
              <div className={styles.total}>{`Total: $${sum()}`}</div>
              <button>Check Out Cart</button>
            </footer>
          </>
        )}
      </main>
    </>
  );
};

export default Cart;
