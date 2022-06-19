import { Reducer } from 'redux';
import { Message } from 'src/common-types';
import { ADD_CHAT, ADD_MESSAGE, REMOVE_CHAT } from './actions';
import { MessageActions } from './types';

export interface MessagesState {
  [key: string]: Message[];
}

const initialMessages: MessagesState = {
  First: [
    {
      author: 'Robot',
      text: 'Welcome to first chat!',
      side: 'right',
    },
  ],
  Second: [
    {
      author: 'Robot',
      text: 'Welcome to second chat!',
      side: 'right',
    },
  ],
};

export const messageReducer: Reducer<MessagesState, MessageActions> = (
  state = initialMessages,
  action
) => {
  switch (action.type) {
    case ADD_CHAT: {
      return {
        ...state,
        [action.newChat]: [],
      };
    }
    case REMOVE_CHAT: {
      const chats = { ...state };
      delete chats[action.chatName];
      return chats;
    }
    case ADD_MESSAGE: {
      return {
        ...state,
        [action.chatName]: [
          ...state[action.chatName],
          {
            author: action.message.author,
            text: action.message.text,
            side: action.message.side,
          },
        ],
      };
    }
    default:
      return state;
  }
};
