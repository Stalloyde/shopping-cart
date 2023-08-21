import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CartContext } from '../../../Router';

describe('Filter List', () => {
  const guitars = [
    {
      brand: 'PRS',
    },
    {
      brand: 'PRS',
    },
    {
      brand: 'Gibson',
    },
    {
      brand: 'Cort',
    },
    {
      brand: 'Deluxe',
    },
  ];

  it('filtered brands do not repeat', () => {
    const brandArray = guitars.map((item) => {
      return item.brand;
    });

    const uniqueBrands = brandArray.filter((brand, index) => {
      return brandArray.indexOf(brand) === index;
    });

    const isArrayUnique = (array) => new Set(array).size !== array.length;

    expect(isArrayUnique(uniqueBrands)).toBe(false);
  });

  it('All unique brands are rendered correctly', () => {
    render(<FilterList guitars={guitars} />);
    expect(screen.getByText('All brands')).toBeInTheDocument();
    guitars.forEach((item) => {
      expect(screen.getByText(item.brand)).toBeInTheDocument();
    });
  });
});
