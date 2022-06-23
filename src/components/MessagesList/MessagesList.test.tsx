import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { MessageList } from './MessagesList';

describe('Message', () => {
  it('Render messages', () => {
    render(
      <MessageList
        messages={[
          { author: '1', text: '1', side: 'left' },
          { author: '2', text: '2', side: 'left' },
        ]}
      />
    );

    expect(screen.queryAllByRole('li')).toBeTruthy();
  });

  it('Check messages content', () => {
    render(
      <MessageList
        messages={[
          { author: 'Author', text: 'First message', side: 'left' },
          { author: 'Author', text: 'Second message', side: 'left' },
        ]}
      />
    );

    expect(screen.getByText(/First message/)).toBeInTheDocument();
    expect(screen.getByText(/Second message/)).toBeInTheDocument();
  });

  it('Empty message list', () => {
    render(<MessageList messages={[]} />);

    expect(screen.queryByRole('li')).toBeNull();
  });
});
