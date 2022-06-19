import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MessageList } from './MessagesList';
import { Message } from 'src/common-types';

describe('MessagesList', () => {
  it('Render component', () => {
    render(<MessageList messages={[]} />);
  });

  it('Empty messages array', async () => {
    render(<MessageList messages={[]} />);

    expect(screen.queryAllByRole<HTMLLIElement>('li').length).toBe(0);
  });

  it('2 messages in array', async () => {
    const messages: Message[] = [
      {
        author: 'User_1',
        text: 'Test message 1',
        side: 'left',
      },
      {
        author: 'User_2',
        text: 'Test message 2',
        side: 'left',
      },
    ];

    render(<MessageList messages={messages} />);

    expect(screen.getAllByTestId<HTMLLIElement>('message')[0].innerHTML).toBe(
      'Test message 1'
    );
    expect(screen.getAllByTestId<HTMLLIElement>('li').length).toBe(2);
  });
});
