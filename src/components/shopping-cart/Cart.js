import React from 'react';
import Header from '../header/Header';
import './Cart.css';
import { Link } from 'react-router-dom';

const CartGrids = ({ item, setQuantityToAddToCart }) => {
  const handleChange = (e) => {
    item.quantity = Number(e.target.value);
    setQuantityToAddToCart(item.quantity);
  };

  return (
    <div className='cart-content'>
      <div className='cart-image-container'>
        <img src={item.imageSrc} height={item.height} width={item.width}></img>
      </div>
      <div className='cart-details'>
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
      </div>

      <div className='cart-delete'>
        <button>Delete Item</button>
      </div>
    </div>
  );
};

const Cart = ({ cartArray, quantityToAddToCart, setQuantityToAddToCart }) => {
  const sum = () => {
    const pricexQuantityArray = cartArray.map(
      (item) => item.price * item.quantity
    );
    return pricexQuantityArray.reduce((total, current) => total + current);
  };

  return (
    <>
      <Header cartArray={cartArray} />
      <div className='cart-container'>
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
            <div className='cart-grids-container'>
              {cartArray.map((item) => (
                <CartGrids
                  item={item}
                  key={item.model}
                  id={item.id}
                  quantityToAddToCart={quantityToAddToCart}
                  setQuantityToAddToCart={setQuantityToAddToCart}
                />
              ))}
            </div>
            <div className='checkout-container'>
              <div className='total'>{`Total: $${sum()}`}</div>
              <button>Check Out Cart</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
