import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import uniqid from 'uniqid';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Link } from 'react-router-dom';
import { CartGrids } from './Cart';

describe('Card', () => {
  const cartMock = {
    brand: 'PRS',
    model: 'PRS CE24 - Black',
    price: 100,
    quantity: 10,
    id: uniqid(),
  };

  it('renders CartGrids component correctly', () => {
    render(<CartGrids item={cartMock} key={cartMock.model} id={cartMock.id} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(cartMock.model)).toBeInTheDocument();
    expect(screen.getByText(`Price: $${cartMock.price}`)).toBeInTheDocument();
    expect(screen.getByText('Quantity:')).toBeInTheDocument();
    expect(
      screen.getByText(`Subtotal: $${cartMock.price * cartMock.quantity}`)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('delete button removes cart item', async () => {
    const setCartArray = jest.fn();
    const handleDeleteMock = jest.fn();
    const user = userEvent.setup();

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce((initState) => [initState, setCartArray]);

    handleDeleteMock.mockImplementation((e) => {
      const copy = [cartMock];
      const updatedCopy = copy.filter((item) => item.id !== e.target.id);
      setCartArray(updatedCopy);
    });

    render(
      <button id={cartMock.id} onClick={handleDeleteMock}>
        Delete
      </button>
    );
    const button = screen.getByRole('button', { name: 'Delete' });

    await act(async () => user.click(button));

    expect(setCartArray).toHaveBeenCalledWith([]);
  });

  it('quantity change in input reflects on cart items quantity', async () => {
    const user = userEvent.setup();
    const setQuantityToAddToCart = jest.fn();
    const handleChangeMock = jest.fn();

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce((initState) => [
        initState,
        setQuantityToAddToCart,
      ]);

    handleChangeMock.mockImplementation((e) => {
      cartMock.quantity = Number(e.target.value);
      setQuantityToAddToCart(cartMock.quantity);
    });

    render(<input type='number' onChange={handleChangeMock}></input>);

    const input = screen.getByRole('spinbutton');

    await act(async () => user.type(input, '12'));

    expect(cartMock).toEqual({
      brand: 'PRS',
      model: 'PRS CE24 - Black',
      price: 100,
      quantity: 12,
      id: cartMock.id,
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
        {cartMock.length === 0 ? (
          <>Your shopping cart is currently empty.</>
        ) : (
          <>
            <div className='cart-grids-container'>Cart items here</div>
            <div className='checkout-container'>
              <div className='total'>{`Total: $${cartMock.price}`}</div>
              <button>Check Out Cart</button>
            </div>
          </>
        )}
      </div>
    );

    expect(screen.getByText('Cart items here')).toBeInTheDocument();
    expect(screen.getByText(`Total: $${cartMock.price}`)).toBeInTheDocument();
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
              <div className='total'>{`Total: $${cartMock.price}`}</div>
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
