import React from 'react';
import { useState } from 'react';

const Card = ({
  guitars,
  guitarModel,
  src,
  width,
  height,
  guitarPrice,
  id,
  cartArray,
  setCartArray,
}) => {
  const [quantityToAddToCart, setQuantityToAddToCart] = useState(1);
  const [isInCart, setIsInCart] = useState(false);

  const handleChange = (e) => {
    setQuantityToAddToCart(e.target.value);
  };

  const handleClick = (e) => {
    guitars.forEach((item) => {
      if (item.id === e.target.id) {
        item.quantity = Number(quantityToAddToCart);
        setCartArray([...cartArray, item]);
        setIsInCart(true);
      }
    });

    console.log(cartArray);
  };

  return (
    <>
      <div className='card' key={guitarModel}>
        <div className='image-container'>
          <img src={src} alt={guitarModel} width={width} height={height}></img>
        </div>
        <div className='description'>
          <div>
            <strong>{guitarModel}</strong>
          </div>
          <div>${guitarPrice}</div>
          <div className='add-to-cart'>
            <div className='input-container'>
              <label>
                Quantity:
                <input
                  onChange={handleChange}
                  name={guitarModel}
                  type='number'
                  min='1'
                  defaultValue='1'
                ></input>
              </label>
              {isInCart ? <div>Added to Cart</div> : null}
            </div>
            <div>
              <button id={id} onClick={handleClick}>
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
