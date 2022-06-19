import { Dispatch } from 'redux';
import { Message } from 'src/common-types';
import { AddChat, AddMessage, RemoveChat } from './types';

export const ADD_CHAT = 'MESSAGES::ADD_CHAT';
export const REMOVE_CHAT = 'MESSAGES::REMOVE_CHAT';
export const ADD_MESSAGE = 'MESSAGES::ADD_MESSAGE';

export const addChat: AddChat = (newChat) => ({
  type: ADD_CHAT,
  newChat,
});

export const removeChat: RemoveChat = (chatName) => ({
  type: REMOVE_CHAT,
  chatName,
});

export const addMessage: AddMessage = (chatName, message) => ({
  type: ADD_MESSAGE,
  chatName,
  message,
});

let timeout: NodeJS.Timeout;

export const addMessageWithReply =
  (chatName: string, message: Message) => (dispatch: Dispatch) => {
    dispatch(addMessage(chatName, message));

    if (message.author !== 'Robot') {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        dispatch(
          addMessage(chatName, {
            author: 'Robot',
            text: message.author + ' wrote a new message.',
            side: 'right',
          })
        );
      }, 1500);
    }
  };
