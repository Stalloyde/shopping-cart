import React from 'react';
import Header from '../header/Header';

const Cart = ({ cartArray }) => (
  <>
    <Header cartArray={cartArray} />
    <div> SHOPPING CART HERE </div>
  </>
);

export default Cart;
