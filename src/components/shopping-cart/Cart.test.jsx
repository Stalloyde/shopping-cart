import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Link } from 'react-router-dom';
import { CartGrids } from './Cart';
import { CartContext } from '../../Router';

describe('Card', () => {
  const cartArray = {
    id: 1,
    title: 'Product A',
    price: '100',
    quantity: 12,
    category: 'electronics',
  };

  it('renders CartGrids component correctly', () => {
    render(
      <CartContext.Provider value={cartArray}>
        <CartGrids
          cartItem={cartArray}
          key={`${cartArray.id}-${cartArray.title}`}
          id={cartArray.id}
        />
      </CartContext.Provider>
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(cartArray.title)).toBeInTheDocument();
    expect(screen.getByText(`Price: $${cartArray.price}`)).toBeInTheDocument();
    expect(screen.getByText('Quantity:')).toBeInTheDocument();
    expect(
      screen.getByText(
        `Subtotal: $${(cartArray.price * cartArray.quantity).toFixed(2)}`
      )
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('delete button removes cart item', async () => {
    const setCartArray = vi.fn();
    const handleDeleteMock = vi.fn();
    const user = userEvent.setup();

    vi.spyOn(React, 'useState').mockImplementationOnce((initState) => [
      initState,
      setCartArray,
    ]);

    handleDeleteMock.mockImplementation((e) => {
      const copy = [cartArray];
      const updatedCopy = copy.filter(
        (item) => item.id !== Number(e.target.id)
      );
      setCartArray(updatedCopy);
    });

    render(
      <button id={cartArray.id} onClick={handleDeleteMock}>
        Delete
      </button>
    );
    const button = screen.getByRole('button', { name: 'Delete' });

    await act(async () => user.click(button));

    expect(setCartArray).toHaveBeenCalledWith([]);
  });

  it('quantity change in input reflects on cart items quantity', async () => {
    const user = userEvent.setup();
    const setQuantityToAddToCart = vi.fn();
    const handleChangeMock = vi.fn();

    vi.spyOn(React, 'useState').mockImplementationOnce((initState) => [
      initState,
      setQuantityToAddToCart,
    ]);

    handleChangeMock.mockImplementation((e) => {
      cartArray.quantity = Number(e.target.value);
      setQuantityToAddToCart(cartArray.quantity);
    });

    render(<input type='number' onChange={handleChangeMock}></input>);

    const input = screen.getByRole('spinbutton');

    await act(async () => user.type(input, '12'));

    expect(cartArray).toEqual({
      id: 1,
      title: 'Product A',
      price: '100',
      quantity: 12,
      category: 'electronics',
    });

    expect(setQuantityToAddToCart).toHaveBeenCalledWith(12);
  });

  it('View our Collection routes to correct page', async () => {
    const user = userEvent.setup();
    const history = createMemoryHistory({ initialEntries: ['/'] });
    render(
      <Router location={history.location} navigator={history}>
        <Link to='/catalog'>
          <div>View Our Collection</div>
        </Link>
      </Router>
    );
    expect(history.location.pathname).toBe('/');
    const button = screen.getByText('View Our Collection');
    await act(async () => user.click(button));
    expect(history.location.pathname).toBe('/catalog');
  });

  it('conditional rendering renders correctly if cartArray is not empty', () => {
    render(
      <div className='cart-container'>
        {cartArray.length === 0 ? (
          <>Your shopping cart is currently empty.</>
        ) : (
          <>
            <div className='cart-grids-container'>Cart items here</div>
            <div className='checkout-container'>
              <div className='total'>{`Total: $${cartArray.price}`}</div>
              <button>Check Out Cart</button>
            </div>
          </>
        )}
      </div>
    );

    expect(screen.getByText('Cart items here')).toBeInTheDocument();
    expect(screen.getByText(`Total: $${cartArray.price}`)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Check Out Cart' })
    ).toBeInTheDocument();
  });

  it('conditional rendering renders correctly if cartArray is empty', () => {
    const emptyCartMock = [];
    render(
      <div className='cart-container'>
        {emptyCartMock.length === 0 ? (
          <>
            Your shopping cart is currently empty.
            <div>View Our Collection</div>
          </>
        ) : (
          <>
            <div className='cart-grids-container'>Cart items here</div>
            <div className='checkout-container'>
              <div className='total'>{`Total: $${cartArray.price}`}</div>
              <button>Check Out Cart</button>
            </div>
          </>
        )}
      </div>
    );

    expect(
      screen.getByText(`Your shopping cart is currently empty.`)
    ).toBeInTheDocument();

    expect(screen.getByText(`View Our Collection`)).toBeInTheDocument();
  });
});
