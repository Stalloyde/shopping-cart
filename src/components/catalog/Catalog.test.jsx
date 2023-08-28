import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card/Card';
import { CartContext } from '../../App';

describe('Catalog Card', () => {
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
      category: 'jewelery',
    },
    {
      id: 3,
      title: 'Product C',
      price: '300',
      category: 'jewelery',
    },
    {
      id: 4,
      title: 'Product D',
      price: '300',
      category: 'electronics',
    },
    {
      id: 5,
      title: 'Product E',
      price: '400',
      category: 'jewelery',
    },
  ];

  it('Initial render renders all items in products array', () => {
    render(
      <>
        <CartContext.Provider value={products}>
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
        </CartContext.Provider>
      </>
    );

    const buttons = screen.getAllByText('Quantity:');
    buttons.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });
});
