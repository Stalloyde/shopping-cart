import React, { useState, useContext } from 'react';
import './Card.css';
import { Dialog } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { CartContext } from '../../../App';

const Card = ({ products, productTitle, src, productPrice, id }) => {
  const { cartArray, setCartArray } = useContext(CartContext);
  const [isInCart, setIsInCart] = useState(false);
  const [open, setOpen] = useState(false);
  const [qtyValue, setQtyValue] = useState(1);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setQtyValue(e.target.value);
  };

  const checkDuplicate = (item) => {
    const copy = cartArray.map((cartItem) => cartItem);
    let isDuplicate = false;

    copy.forEach((copy) => {
      if (copy.id === item.id) {
        copy.quantity = item.quantity;
        isDuplicate = true;
      }
    });
    isDuplicate ? setCartArray([...copy]) : setCartArray([...copy, item]);
  };

  const handleClick = (e) => {
    products.forEach((item) => {
      if (item.id === Number(e.target.id)) {
        if (!item.quantity) {
          item.quantity = Number(qtyValue);
        } else {
          item.quantity += Number(qtyValue);
        }

        checkDuplicate(item);
        setIsInCart(true);
        setOpen(true);
      }
    });
  };

  return (
    <>
      <article className='card' key={productTitle}>
        <div className='image-container'>
          <img src={src} alt={productTitle}></img>
        </div>
        <section className='description'>
          <div>
            <strong>{productTitle}</strong>
          </div>
          <div>${productPrice}</div>
          <div className='add-to-cart'>
            <div className='input-container'>
              <label>
                Quantity: {''}
                <input
                  onChange={handleChange}
                  name={productTitle}
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
                        <strong>{productTitle}</strong> has been added to cart
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
