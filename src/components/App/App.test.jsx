import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { Message } from '../Message/Message';
import { Form } from '../Form/Form';

describe('App', () => {
    it('Bot`s response', async () => {
        const send = jest.fn();
        render(<>
            <Message messageList={[]} />
            <Form sendMessage={send} />
        </>);

        fireEvent.input(screen.getByPlaceholderText('Your message...'), {
            target: { value: 'Test message' },
        });
        fireEvent.click(screen.getByRole('button'));

        //Вариант 1
        expect(await screen.findByText('Robot')).toBeInTheDocument();

        //Вариант 2
        await waitFor(() =>
            expect(screen.getByText('Robot')).toBeInTheDocument()
        );
    });
});