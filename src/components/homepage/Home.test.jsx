import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Link } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

describe('Home component', () => {
  it('change current path to catalog when button is clicked', async () => {
    const user = userEvent.setup();
    const history = createMemoryHistory({ initialEntries: ['/'] });
    render(
      <Router location={history.location} navigator={history}>
        <Link to='/catalog/all products'>
          <div>View Our Collection</div>
        </Link>
      </Router>
    );
    expect(history.location.pathname).toBe('/');
    const button = screen.getByText('View Our Collection');
    await act(async () => user.click(button));
    expect(history.location.pathname).toBe('/catalog/all products');
  });
});
