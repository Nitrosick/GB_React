import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { App } from '../App/App';
// import { Message } from '../Message/Message';
// import { Form } from '../Form/Form';

describe('App', () => {
  it('Bot`s response', async () => {
    render(<App />);

    fireEvent.input(screen.getByPlaceholderText('Your message...'), {
      target: { value: 'Test message' },
    });
    fireEvent.click(screen.getByTestId('send'));

    //Вариант 1
    expect(await screen.findByText('Robot')).toBeInTheDocument();

    //Вариант 2
    // await waitFor(() =>
    //     expect(screen.getByText('Robot')).toBeInTheDocument()
    // );
  });
});
