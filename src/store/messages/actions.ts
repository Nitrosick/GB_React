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

export const addMessage: AddMessage = (chatName, text) => ({
  type: ADD_MESSAGE,
  chatName,
  text,
});