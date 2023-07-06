import React from 'react';
import { useState } from 'react';

const Card = ({ guitars }) => {
  // const [inputValue, setInputValue] = useState(1);
  const [quantityToAddToCart, setQuantityToAddToCart] = useState(1);
  const [cartArray, setCartArray] = useState([]);

  const handleChange = (e) => {
    setQuantityToAddToCart(e.target.value);
  };

  const handleClick = (e) => {
    guitars.forEach((item) => {
      if (item.id === e.target.id) {
        item.quantity = Number(quantityToAddToCart);
        setCartArray([...cartArray, item]);
      }
    });
  };

  return (
    <>
      {guitars.map((item) => (
        <div className='card' key={item.model}>
          <div className='image-container'>
            <img
              src={item.imageSrc}
              alt={item.model}
              width={item.width}
              height={item.height}
            ></img>
          </div>
          <div className='description'>
            <div>
              <strong>{item.model}</strong>
            </div>
            <div>${item.price}</div>
            <div className='add-to-cart'>
              <>
                <label>
                  Quantity:
                  <input
                    onChange={handleChange}
                    name={item.model}
                    type='number'
                    min='1'
                    defaultValue='1'
                  ></input>
                </label>
              </>
              <div>
                <button id={item.id} onClick={handleClick}>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
