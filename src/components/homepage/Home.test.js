import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils';
import Home from './Home';

describe('Home component', () => {
  it('renders the hompeage', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByTestId('homepage')).toMatchSnapshot();
  });

  it('change current path to catalog when button is clicked', async () => {
    const user = userEvent.setup();
    const history = createMemoryHistory({ initialEntries: ['/'] });
    render(
      <Router location={history.location} navigator={history}>
        <Home />
      </Router>
    );
    expect(history.location.pathname).toBe('/');
    const button = screen.getByText('View Our Collection');
    await act(async () => user.click(button));
    expect(history.location.pathname).toBe('/catalog');
  });
});
