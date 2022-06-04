import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Messages } from './Messages';

describe('Message', () => {
  it('Render messages', () => {
    render(
      <Messages
        messageList={[
          { author: '1', text: '1', side: 'left' },
          { author: '2', text: '2', side: 'left' },
        ]}
      />
    );

    expect(screen.queryAllByRole('li')).toBeTruthy();
  });

  it('Check messages content', () => {
    render(
      <Messages
        messageList={[
          { author: 'Author', text: 'First message', side: 'left' },
          { author: 'Author', text: 'Second message', side: 'left' },
        ]}
      />
    );

    expect(screen.getByText(/First message/)).toBeInTheDocument();
    expect(screen.getByText(/Second message/)).toBeInTheDocument();
  });

  it('Empty message list', () => {
    render(<Messages messageList={[]} />);

    expect(screen.queryByRole('li')).toBeNull();
  });
});
