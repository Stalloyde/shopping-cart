//test if card renders all guitars

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
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

  it('renders all Card component correctly', () => {
    render(<Card guitars={guitars} />);
    guitars.forEach((item) => {
      expect(screen.getByText(item.model)).toBeInTheDocument();
      const guitarImages = screen.getAllByRole('img');
      const guitarPrices = screen.getAllByText(`$${item.price}`);
      const cardInputs = screen.getAllByLabelText('Quantity:');
      const buttons = screen.getAllByRole('button', { name: 'Add To Cart' });

      guitarImages.forEach((img) => {
        expect(img).toBeInTheDocument();
      });

      guitarPrices.forEach((price) => {
        console.log(price);
        expect(price).toBeInTheDocument();
      });

      cardInputs.forEach((input) => {
        expect(input).toBeInTheDocument();
      });

      buttons.forEach((button) => {
        expect(button).toBeInTheDocument();
      });
    });
  });
});
