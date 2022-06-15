import { ADD_CHAT, REMOVE_CHAT, ADD_MESSAGE } from './actions';

export type MessageActions =
  | ReturnType<AddChat>
  | ReturnType<RemoveChat>
  | ReturnType<AddMessage>;

export type AddChat = (newChat: string) => {
  type: typeof ADD_CHAT;
  newChat: string;
};

export type RemoveChat = (chatName: string) => {
  type: typeof REMOVE_CHAT;
  chatName: string;
};

export type AddMessage = (
  chatName: string,
  text: string
) => {
  type: typeof ADD_MESSAGE;
  chatName: string;
  text: string;
};