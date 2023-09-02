import React, { useContext } from 'react';
import Card from '../Card/Card';
import styles from '../Catalog.module.css';
import { CartContext } from '../../../App';

const Electronics = () => {
  const { products } = useContext(CartContext);

  const filteredProducts = products.filter(
    (product) => product.category === 'electronics'
  );

  return (
    <>
      {filteredProducts.map((item) => (
        <Card
          products={filteredProducts}
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
