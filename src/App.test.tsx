import React from 'react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('Bot`s response', async () => {
    render(<App />);

    fireEvent.input(screen.getByPlaceholderText('Your message...'), {
      target: { value: 'Test message' },
    });

    fireEvent.click(screen.getByTestId('send'));

    // expect(await screen.findByText('Robot')).toBeInTheDocument();

    await waitFor(() =>
        expect(screen.getByText('Robot')).toBeInTheDocument(),
        { timeout: 2000 }
    );
  });
});
