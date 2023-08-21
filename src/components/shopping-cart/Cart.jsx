import React, { useContext } from 'react';
import Header from '../header/Header';
import './Cart.css';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Router';

export const CartGrids = ({ item }) => {
  const { cartArray, setCartArray, setQuantityToAddToCart } =
    useContext(CartContext);

  const handleChange = (e) => {
    item.quantity = Number(e.target.value);
    setQuantityToAddToCart(item.quantity);
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
          src={item.imageSrc}
          height={item.height}
          width={item.width}
          alt={item.model}
        ></img>
      </div>
      <section className='cart-details'>
        <div>
          <h3>{item.model}</h3>
        </div>
        <div>{`Price: $${item.price}`}</div>
        <div>
          Quantity:{' '}
          <input
            type='number'
            defaultValue={item.quantity}
            min='1'
            onChange={handleChange}
          ></input>
        </div>
        <div>Subtotal: {`$${item.price * item.quantity}`}</div>
      </section>

      <section className='cart-delete'>
        <button id={item.id} onClick={handleDelete}>
          Delete
        </button>
      </section>
    </article>
  );
};

const Cart = () => {
  const { cartArray, setCartArray, setQuantityToAddToCart } =
    useContext(CartContext);

  const sum = () => {
    const pricexQuantityArray = cartArray.map(
      (item) => item.price * item.quantity
    );
    return pricexQuantityArray.reduce((total, current) => total + current);
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
            <Link to='/catalog'>
              <div>View Our Collection</div>
            </Link>
          </>
        ) : (
          <>
            <section className='cart-grids-container'>
              {cartArray.map((item) => (
                <CartGrids
                  item={item}
                  key={item.model}
                  id={item.id}
                  quantityToAddToCart={quantityToAddToCart}
                  setQuantityToAddToCart={setQuantityToAddToCart}
                  cartArray={cartArray}
                  setCartArray={setCartArray}
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
