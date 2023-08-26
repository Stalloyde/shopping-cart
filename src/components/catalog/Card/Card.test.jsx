import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Dialog } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { CartContext } from '../../../Router';

describe('Card', () => {
  const cartArray = {
    id: 1,
    title: 'Product A',
    price: '100',
    quantity: 12,
    category: 'electronics',
  };

  it('renders Card component correctly', () => {
    render(
      <CartContext.Provider value={cartArray}>
        <Card
          cartArray={cartArray}
          productTitle={cartArray.title}
          productPrice={cartArray.price}
          id={cartArray.id}
        />
      </CartContext.Provider>
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(cartArray.title)).toBeInTheDocument();
    expect(screen.getByText(`$${cartArray.price}`)).toBeInTheDocument();
    expect(screen.getByLabelText('Quantity:')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Add To Cart' })
    ).toBeInTheDocument();
  });

  it('input value change is passed to setQuantityToAddToCart state correctly', async () => {
    const setState = vi.fn();
    vi.spyOn(React, 'useState').mockImplementationOnce((initState) => [
      initState,
      setState,
    ]);

    const handleChangeMock = vi.fn((e) => {
      const value = Number(e.target.value);
      setState(value);
    });

    const user = userEvent.setup();

    render(
      <label>
        Quantity:
        <input onChange={handleChangeMock} type='number'></input>
      </label>
    );

    const input = screen.getByRole('spinbutton');
    await act(async () => user.type(input, '3'));

    expect(setState).toHaveBeenCalledWith(3);
  });

  it('Correct quantity is passed into setCartArray on button click', async () => {
    const setCartArray = vi.fn();
    const user = userEvent.setup();

    vi.spyOn(React, 'useState').mockImplementationOnce((cartArray) => [
      cartArray,
      setCartArray,
    ]);

    const handleClickMock = vi.fn(() => {
      cartArray.quantity = Number(3);
      setCartArray([cartArray]);
    });

    render(<button onClick={handleClickMock}>Add To Cart</button>);

    const button = screen.getByRole('button', { name: 'Add To Cart' });
    await act(async () => user.click(button));

    expect(setCartArray).toHaveBeenCalledWith([cartArray]);
  });

  it('Added to Cart notification renders on button click', async () => {
    const setIsInCart = vi.fn();
    const openMock = vi.fn(() => true);
    const handleClickMock = vi.fn();
    const user = userEvent.setup();

    vi.spyOn(React, 'useState').mockImplementationOnce((isInCart) => [
      isInCart,
      setIsInCart,
    ]);

    render(
      <div>
        {setIsInCart ? (
          <Dialog open={openMock()}>
            <div>
              <DialogContent id='dialog-container'>
                <DialogContentText id='dialog-content'>
                  <strong>{cartArray.title}</strong> has been added to cart
                </DialogContentText>
              </DialogContent>
            </div>
          </Dialog>
        ) : null}
        <button data-testid='test' onClick={handleClickMock}>
          Add To Cart
        </button>
      </div>
    );

    const button = screen.getByTestId('test');
    await act(async () => user.click(button));

    expect(screen.getByText('has been added to cart')).toBeInTheDocument();
  });

  it('cart Array merges quantity for duplicate cartArray instead of adding as separate object', async () => {
    const setCartArray = vi.fn();
    const handleClickMock = vi.fn(() => {
      const inputValueMock = 4;
      cartArray.quantity += inputValueMock;
    });
    const user = userEvent.setup();

    vi.spyOn(React, 'useState').mockImplementationOnce((cartArray) => [
      cartArray,
      setCartArray,
    ]);

    render(
      <button data-testid='test' id={cartArray.id} onClick={handleClickMock}>
        Add To Cart
      </button>
    );

    const button = screen.getByTestId('test');
    await act(async () => user.click(button));

    expect(cartArray).toEqual({
      id: 1,
      title: 'Product A',
      price: '100',
      quantity: 7,
      category: 'electronics',
    });
  });
});
