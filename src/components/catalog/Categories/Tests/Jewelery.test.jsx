import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from '../../Card/Card';
import { CartContext } from '../../../../App';

describe('Card', () => {
  const products = [
    {
      id: 1,
      title: 'Product A',
      price: '100',
      category: 'electronics',
    },
    {
      id: 2,
      title: 'Product B',
      price: '200',
      category: "men's clothing",
    },
    {
      id: 3,
      title: 'Product C',
      price: '300',
      category: 'jewelery',
    },
    {
      id: 4,
      title: 'Product I',
      price: '400',
      category: "women's clothing",
    },
  ];

  it('filters correctly', () => {
    const filteredProducts = products.filter(
      (product) => product.category === 'jewelery'
    );

    render(
      <>
        <CartContext.Provider value={filteredProducts}>
          {filteredProducts.map((item) => (
            <Card
              key={`${item.id}-${item.title}`}
              products={item}
              productTitle={item.title}
              productPrice={item.price}
              id={item.id}
            />
          ))}
        </CartContext.Provider>
      </>
    );

    filteredProducts.forEach((product) => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
      expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
      expect(screen.getByLabelText('Quantity:')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Add To Cart' })
      ).toBeInTheDocument();
    });
  });
});
