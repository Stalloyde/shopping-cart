import React, { useContext } from 'react';
import Card from '../Card/Card';
import styles from '../Catalog.module.css';
import { CartContext, CartContextType } from '../../../App';

const WomensClothing = () => {
  const { products } = useContext(CartContext) as CartContextType;

  if (products) {
    const filteredProducts = products.filter(
      (product) => product.category === "women's clothing",
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
  } else {
    return null;
  }
};

export default WomensClothing;
