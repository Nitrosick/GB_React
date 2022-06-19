import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Form } from './Form';

describe('Form', () => {
  it('Check text in button', () => {
    const send = jest.fn();
    render(<Form addMessage={send} />);

    expect(screen.getByRole('button')).toBeTruthy();
    expect(screen.getByText(/Send/)).toBeInTheDocument();
  });

  it('Button is enabled', () => {
    const send = jest.fn();
    render(<Form addMessage={send} />);

    expect(screen.getByRole('button')).toBeEnabled();
  });

  it('Button click with userEvent', async () => {
    const send = jest.fn();
    render(<Form addMessage={send} />);
    await userEvent.click(screen.getByRole('button'));

    expect(send).toHaveBeenCalledTimes(1);
  });

  it('Test input', async () => {
    const send = jest.fn();
    const dom: any = render(<Form addMessage={send} />);
    await userEvent.type(
      dom.container.querySelector('#message_input'),
      'Test message'
    );

    expect(dom.container.querySelector('#message_input').value).toBe(
      'Test message'
    );
  });
});
