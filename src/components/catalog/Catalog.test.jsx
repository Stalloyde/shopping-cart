import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from './Card/Card';
import FilterList from './FilterList/FilterList';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

describe('Catalog Card', () => {
  const guitars = [
    {
      brand: 'PRS',
      model: 'PRS CE24 - Black',
      price: 100,
      height: '100%',
      width: '100%',
    },
    {
      brand: 'Gibson',
      model: 'Gibson 70s Explorer - Classic White',
      price: 200,
      height: '85%',
      width: '45%',
    },
    {
      brand: 'Ibanez',
      model: 'Ibanez AR520HFM-VLS - Violin Burst',
      price: 300,
      height: '100%',
      width: '100%',
    },
    {
      brand: 'Ibanez',
      model: 'Ibanez AR520HFM-VLS - Violin Burst 2',
      price: 300,
      height: '100%',
      width: '100%',
    },
    {
      brand: 'Schecter',
      model: 'Schecter Avenger Exotic - Spalted Maple',
      price: 100,
      height: '85%',
      width: '30%',
    },
  ];

  it('Initial render renders all items in guitars array', () => {
    render(
      <>
        {guitars.map((item) => (
          <Card
            guitars={guitars}
            key={item.model}
            guitarModel={item.model}
            src={item.imageSrc}
            width={item.width}
            height={item.height}
            guitarPrice={item.price}
            id={item.id}
          />
        ))}
      </>
    );

    const buttons = screen.getAllByText('Quantity:');
    buttons.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
  });

  it('on filter - array contains only selected brands', async () => {
    const setState = jest.fn();

    jest
      .spyOn(React, 'useState')
      .mockImplementationOnce((initState) => initState, setState);

    const filterBrandMock = (e) => {
      const filteredGuitars = guitars.filter((guitar) => {
        if (e.target.textContent === guitar.brand) {
          return guitar;
        }
      });
      setState(filteredGuitars);
    };
    const user = userEvent.setup();

    render(<FilterList guitars={guitars} filterBrand={filterBrandMock} />);

    const schecter = screen.getByText('Schecter');
    await act(async () => user.click(schecter));

    expect(setState).toHaveBeenCalledWith([
      {
        brand: 'Schecter',
        height: '85%',
        model: 'Schecter Avenger Exotic - Spalted Maple',
        price: 100,
        width: '30%',
      },
    ]);

    const ibanez = screen.getByText('Ibanez');
    await act(async () => user.click(ibanez));
    expect(setState).toHaveBeenCalledWith([
      {
        brand: 'Ibanez',
        model: 'Ibanez AR520HFM-VLS - Violin Burst',
        price: 300,
        height: '100%',
        width: '100%',
      },
      {
        brand: 'Ibanez',
        model: 'Ibanez AR520HFM-VLS - Violin Burst 2',
        price: 300,
        height: '100%',
        width: '100%',
      },
    ]);
  });
});
