import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import Header from './Header';
import { Link } from 'react-router-dom';

describe('Header component', () => {
  it('change current path to home when Home is clicked', async () => {
    const user = userEvent.setup();
    const history = createMemoryHistory({ initialEntries: ['/'] });
    render(
      <Router location={history.location} navigator={history}>
        <Link to='/'>
          <div>Home</div>
        </Link>
      </Router>
    );
    expect(history.location.pathname).toBe('/');
    const button = screen.getByText('Home');
    await act(async () => user.click(button));
    expect(history.location.pathname).toBe('/');
  });

  it('change current path to catalog when Catalog is clicked', async () => {
    const user = userEvent.setup();
    const history = createMemoryHistory({ initialEntries: ['/'] });
    render(
      <Router location={history.location} navigator={history}>
        <Link to='/catalog'>
          <div>Catalog</div>
        </Link>
      </Router>
    );
    expect(history.location.pathname).toBe('/');
    const button = screen.getByText('Catalog');
    await act(async () => user.click(button));
    expect(history.location.pathname).toBe('/catalog');
  });

  it('change current path to Cart when Cart is clicked', async () => {
    const user = userEvent.setup();
    const history = createMemoryHistory({ initialEntries: ['/'] });
    render(
      <Router location={history.location} navigator={history}>
        <Link to='/cart'>
          <div>Cart</div>
        </Link>
      </Router>
    );
    expect(history.location.pathname).toBe('/');
    const button = screen.getByText('Cart');
    await act(async () => user.click(button));
    expect(history.location.pathname).toBe('/cart');
  });

  //check if cartArray change leads to change in qtyInCart
});
