import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from './Card/Card';

describe('Catalog Card', () => {
  const guitars = [
    {
      brand: 'PRS',
      model: 'PRS CE24 - Black',
      price: 100,
      height: '100%',
      width: '100%',
    },
    {
      brand: 'Gibson',
      model: 'Gibson 70s Explorer - Classic White',
      price: 200,
      height: '85%',
      width: '45%',
    },
    {
      brand: 'Ibanez',
      model: 'Ibanez AR520HFM-VLS - Violin Burst',
      price: 300,
      height: '100%',
      width: '100%',
    },
    {
      brand: 'Schecter',
      model: 'Schecter Avenger Exotic - Spalted Maple',
      price: 100,
      height: '85%',
      width: '30%',
    },
  ];

  it('Number of times Card is rendered is according to array length', () => {
    render(
      <>
        {guitars.map((item) => (
          <Card
            guitars={guitars}
            key={item.model}
            guitarModel={item.model}
            src={item.imageSrc}
            width={item.width}
            height={item.height}
            guitarPrice={item.price}
            id={item.id}
          />
        ))}
      </>
    );

    const buttons = screen.getAllByText('Quantity:');
    buttons.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });
});
