import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from './Form';
import { rootReducer } from 'src/store';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

describe('Form', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({ reducer: rootReducer });
  });

  it('Render component', () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );
  });

  it('Input new message with fireEvent', () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    const input = screen.getByTestId<HTMLInputElement>('input');
    fireEvent.change(input, { target: { value: 'Test message' } });
    expect(input.value).toBe('Test message');
  });

  it('Input new message with userEvent', async () => {
    render(
      <Provider store={store}>
        <Form />
      </Provider>
    );

    const input = screen.getByTestId<HTMLInputElement>('input');
    await userEvent.type(input, 'Test message');
    expect(input.value).toBe('Test message');
  });
});
