import React, { useContext } from 'react';
import Card from '../Card/Card';
import styles from '../Catalog.module.css';
import { CartContext, CartContextType } from '../../../App';

const AllProducts = () => {
  const { products } = useContext(CartContext) as CartContextType;

  return (
    <>
      {products
        ? products.map((item) => (
            <Card
              products={products}
              key={`${item.id}-${item.title}`}
              productTitle={item.title}
              src={item.image}
              productPrice={item.price}
              id={item.id}
            />
          ))
        : null}
    </>
  );
};

export default AllProducts;
