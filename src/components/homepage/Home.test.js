import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';

describe('Home component', () => {
  it('renders correct homepage', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByTestId('homepage')).toMatchSnapshot();
  });
});
