import React from 'react';
import './Card.css';
import { useState } from 'react';
import { Dialog } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

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
  quantityToAddToCart,
  setQuantityToAddToCart,
}) => {
  const [isInCart, setIsInCart] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setQuantityToAddToCart(e.target.value);
  };

  const checkDuplicate = (item) => {
    const copy = cartArray.map((cartItem) => cartItem);
    let isDuplicate = false;

    copy.forEach((copy) => {
      if (copy.model === item.model) {
        copy.quantity = item.quantity;
        isDuplicate = true;
      }
    });
    isDuplicate ? setCartArray([...copy]) : setCartArray([...copy, item]);
  };

  const handleClick = (e) => {
    guitars.forEach((item) => {
      if (item.id === e.target.id) {
        item.quantity += Number(quantityToAddToCart);
        checkDuplicate(item);
        setIsInCart(true);
        setOpen(true);
      }
    });
  };

  return (
    <>
      <article className='card' key={guitarModel}>
        <div className='image-container'>
          <img src={src} alt={guitarModel} width={width} height={height}></img>
        </div>
        <section className='description'>
          <div>
            <strong>{guitarModel}</strong>
          </div>
          <div>${guitarPrice}</div>
          <div className='add-to-cart'>
            <div className='input-container'>
              <label>
                Quantity: {''}
                <input
                  onChange={handleChange}
                  name={guitarModel}
                  type='number'
                  min='1'
                  defaultValue='1'
                ></input>
              </label>
              {isInCart ? (
                <Dialog open={open} onClose={handleClose}>
                  <div>
                    <DialogContent id='dialog-container'>
                      <DialogContentText id='dialog-content'>
                        <strong>{guitarModel}</strong> has been added to cart
                      </DialogContentText>
                    </DialogContent>
                  </div>
                </Dialog>
              ) : null}
            </div>
            <div>
              <button id={id} onClick={handleClick}>
                Add To Cart
              </button>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default Card;
