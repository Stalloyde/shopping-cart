import React, { useContext } from 'react';
import Card from '../Card/Card';
import '../Catalog.css';
import { CartContext } from '../../../Router';

const Electronics = () => {
  const { products } = useContext(CartContext);

  return (
    <>
      {products.map((item) => (
        <Card
          products={products}
          key={`${item.id}-${item.title}`}
          productTitle={item.title}
          src={item.image}
          productPrice={item.price}
          id={item.id}
        />
      ))}
    </>
  );
};

export default Electronics;
