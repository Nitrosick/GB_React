import { messageReducer } from './reducer';

test('Message reducer', () => {
  const state = messageReducer(
    {
      default: [
        { author: 'Robot', text: 'Welcome to first chat!', side: 'right' },
      ],
    },
    {
      type: 'MESSAGES::ADD_MESSAGE',
      chatName: 'default',
      message: { author: 'User', text: 'Test message', side: 'left' },
    }
  );
  console.log(state);
  expect(state).toEqual({
    default: [
      { author: 'Robot', text: 'Welcome to first chat!', side: 'right' },
      { author: 'User', text: 'Test message', side: 'left' },
    ],
  });
});
