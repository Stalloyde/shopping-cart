import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import uniqid from 'uniqid';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Card', () => {
  const guitar = {
    brand: 'PRS',
    model: 'PRS CE24 - Black',
    price: 100,
    quantity: 0,
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

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce((isInCart) => [isInCart, setIsInCart]);

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
    const user = userEvent.setup();

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce((isInCart) => [isInCart, setIsInCart]);

    render(
      <>
        {setIsInCart ? <div>Added to Cart</div> : <div>false</div>}
        <div>
          <button>Add To Cart</button>
        </div>
      </>
    );

    const button = screen.getByRole('button', { name: 'Add To Cart' });
    await act(async () => user.click(button));

    expect(screen.getByText('Added to Cart')).toBeInTheDocument();
  });
});
