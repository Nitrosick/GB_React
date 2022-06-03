import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Message } from './Message';

describe('Message', () => {
    it('Render messages', () => {
        render(<Message messageList={[
            { author: 1, text: 1 },
            { author: 2, text: 2 }
        ]}/>);

        expect(screen.queryAllByRole('li')).toBeTruthy();
    });

    it('Check messages content', () => {
        render(<Message messageList={[
            { author: 'Author', text: 'First message' },
            { author: 'Author', text: 'Second message' }
        ]}/>);

        expect(screen.getByText(/First message/)).toBeInTheDocument();
        expect(screen.getByText(/Second message/)).toBeInTheDocument();
    });

    it('Empty message list', () => {
        render(<Message messageList={[]}/>);

        expect(screen.queryByRole('li')).toBeNull();
    });
});