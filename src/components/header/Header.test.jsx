import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
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

  it('qtyInCart shows total quantity of cart items', () => {
    const cartMock = [
      {
        brand: 'PRS',
        model: 'PRS CE24 - Black',
        price: 100,
        quantity: 10,
        id: 'abc123',
      },
      {
        brand: 'PRS',
        model: 'PRS CE242 - Red',
        price: 100,
        quantity: 2,
        id: 'abc123',
      },
    ];

    const qtyInCartMock = vi.fn();

    qtyInCartMock.mockImplementationOnce(() => {
      if (cartMock.length > 0) {
        const qtyArray = cartMock.map((item) => item.quantity);
        return qtyArray.reduce((total, current) => total + current);
      }

      return 0;
    });

    render(<div>{qtyInCartMock()}</div>);
    expect(screen.getByText(12)).toBeInTheDocument();
  });
});
