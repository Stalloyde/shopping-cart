import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import uniqid from 'uniqid';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Dialog } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

describe('Card', () => {
  const guitar = {
    brand: 'PRS',
    model: 'PRS CE24 - Black',
    price: 100,
    quantity: 1,
    id: uniqid(),
  };

  it('renders Card component correctly', () => {
    render(
      <Card
        guitar={guitar}
        key={guitar.model}
        guitarModel={guitar.model}
        src={guitar.imageSrc}
        width={guitar.width}
        height={guitar.height}
        guitarPrice={guitar.price}
        id={guitar.id}
      />
    );

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(guitar.model)).toBeInTheDocument();
    expect(screen.getByText(`$${guitar.price}`)).toBeInTheDocument();
    expect(screen.getByLabelText('Quantity:')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Add To Cart' })
    ).toBeInTheDocument();
  });

  it('input value change is passed to setQuantityToAddToCart state correctly', async () => {
    const setState = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce((initState) => [initState, setState]);

    const handleChangeMock = jest.fn((e) => {
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
    const setCartArray = jest.fn();
    const user = userEvent.setup();

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce((cartArray) => [cartArray, setCartArray]);

    const handleClickMock = jest.fn(() => {
      guitar.quantity = Number(3);
      setCartArray([guitar]);
    });

    render(<button onClick={handleClickMock}>Add To Cart</button>);

    const button = screen.getByRole('button', { name: 'Add To Cart' });
    await act(async () => user.click(button));

    expect(setCartArray).toHaveBeenCalledWith([guitar]);
  });

  it('Added to Cart notification renders on button click', async () => {
    const setIsInCart = jest.fn();
    const openMock = jest.fn(() => true);
    const handleClickMock = jest.fn();
    const user = userEvent.setup();

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce((isInCart) => [isInCart, setIsInCart]);

    render(
      <div>
        {setIsInCart ? (
          <Dialog open={openMock()}>
            <div>
              <DialogContent id='dialog-container'>
                <DialogContentText id='dialog-content'>
                  <strong>{guitar.model}</strong> has been added to cart
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

  it('cart Array merges quantity for duplicate products instead of adding as separate object', async () => {
    const setCartArray = jest.fn();
    const handleClickMock = jest.fn(() => {
      const inputValueMock = 4;
      guitar.quantity += inputValueMock;
    });
    const user = userEvent.setup();

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce((cartArray) => [cartArray, setCartArray]);

    render(
      <button data-testid='test' id={guitar.id} onClick={handleClickMock}>
        Add To Cart
      </button>
    );

    const button = screen.getByTestId('test');
    await act(async () => user.click(button));

    expect(guitar).toEqual({
      brand: 'PRS',
      model: 'PRS CE24 - Black',
      price: 100,
      quantity: 7,
      id: guitar.id,
    });
  });
});
