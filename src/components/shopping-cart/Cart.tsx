import React, { useContext, useMemo } from 'react';
import Header from '../header/Header';
import styles from './Cart.module.css';
import { Link } from 'react-router-dom';
import { CartArrayType, CartContext, CartContextType } from '../../App';

export const CartGrids: React.FC<{ cartItem: CartArrayType }> = ({
  cartItem,
}) => {
  const { cartArray, setCartArray, setQuantityToAddToCart } = useContext(
    CartContext
  ) as CartContextType;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    cartItem.quantity = Number(e.target.value);
    setQuantityToAddToCart(cartItem.quantity);
    console.log(cartArray);
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
    if (cartArray) {
      const copy = [...cartArray];
      console.log(copy);

      const updatedCopy = copy.filter((item) => {
        return item.id !== Number(e.currentTarget.id);
      });

      setCartArray([...updatedCopy]);
    }
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
          <button id={cartItem.id.toString()} onClick={handleDelete}>
            Remove Item
          </button>
        </div>
      </section>
    </article>
  );
};

const Cart = () => {
  const { cartArray } = useContext(CartContext) as CartContextType;

  const sum = () => {
    if (cartArray) {
      const pricexQuantityArray = cartArray.map(
        (item) => item.price * item.quantity
      );

      const totalPrice = useMemo(() => {
        return pricexQuantityArray
          .reduce((total, current) => total + current, 0)
          .toFixed(2);
      }, [pricexQuantityArray]);
      return totalPrice;
    }
  };

  return (
    <>
      <Header />
      <main className={styles.cartContainer}>
        {!cartArray || cartArray.length === 0 ? (
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
