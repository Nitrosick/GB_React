import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppRouter } from './AppRouter';
import { MemoryRouter } from 'react-router-dom';

describe('App', () => {
  it('Wrong url', () => {
    const setToogle = jest.fn();

    render(
      <MemoryRouter initialEntries={['/wrong_url']}>
        <AppRouter toggle={true} setToggle={setToogle} />
      </MemoryRouter>
    );

    screen.getByText('404 page');
  });
});
