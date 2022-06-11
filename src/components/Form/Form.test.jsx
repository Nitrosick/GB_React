import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Form } from './Form';

describe('Form', () => {
  it('Check text in button', () => {
    render(<Form />);

    expect(screen.getByRole('button')).toBeTruthy();
    expect(screen.getByText(/Send/)).toBeInTheDocument();
  });

  it('Button is enabled', () => {
    render(<Form />);

    expect(screen.getByRole('button')).toBeEnabled();
  });

  it('Button click with userEvent', async () => {
    const send = jest.fn();
    render(<Form sendMessage={send} />);
    await userEvent.click(screen.getByRole('button'));

    expect(send).toHaveBeenCalledTimes(1);
  });

  it('Input user value', async () => {
    const send = jest.fn();
    render(<Form sendMessage={send} />);

    await userEvent.type(
      screen.getByPlaceholderText('Your message...'),
      'Test message'
    );

    expect(screen.getByPlaceholderText('Your message...').value).toBe(
      'Test message'
    );
  });
});
