import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Filter List', () => {
  const categories = [
    'electronics',
    'jewelery',
    "men's clothing",
    "women's clothing",
  ];

  it('All categories are rendered correctly', () => {
    render(
      <ul>
        Filter by:
        <li>All Categories</li>
        {categories.map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    );
    expect(screen.getByText('All Categories')).toBeInTheDocument();
    categories.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
