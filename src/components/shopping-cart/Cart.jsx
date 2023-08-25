import React, { useContext } from 'react';
import Header from '../header/Header';
import './Cart.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Router';

export const CartGrids = ({ cartItem }) => {
  const { cartArray, setCartArray, setQuantityToAddToCart } =
    useContext(CartContext);

  const handleChange = (e) => {
    cartItem.quantity = Number(e.target.value);
    setQuantityToAddToCart(cartItem.quantity);
  };

  const handleDelete = (e) => {
    const copy = [...cartArray];
    const updatedCopy = copy.filter((item) => item.id !== e.target.id);
    setCartArray([...updatedCopy]);
  };

  return (
    <article className='cart-content'>
      <div className='cart-image-container'>
        <img
          src={cartItem.image}
          height={cartItem.height}
          width={cartItem.width}
          alt={cartItem.title}
        ></img>
      </div>
      <section className='cart-details'>
        <div>
          <h3>{cartItem.model}</h3>
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
      </section>

      <section className='cart-delete'>
        <button id={cartItem.id} onClick={handleDelete}>
          Delete
        </button>
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
      <main className='cart-container'>
        {cartArray.length === 0 ? (
          <>
            Your shopping cart is currently empty.
            <br />
            <br />
            <Link className='home-nav' to='/catalog'>
              <div>View Our Collection</div>
            </Link>
          </>
        ) : (
          <>
            <section className='cart-grids-container'>
              {cartArray.map((cartItem) => (
                <CartGrids
                  cartItem={cartItem}
                  key={`${cartItem.id}-${cartItem.title}`}
                  id={cartItem.id}
                />
              ))}
            </section>
            <footer className='checkout-container'>
              <div className='total'>{`Total: $${sum()}`}</div>
              <button>Check Out Cart</button>
            </footer>
          </>
        )}
      </main>
    </>
  );
};

export default Cart;
