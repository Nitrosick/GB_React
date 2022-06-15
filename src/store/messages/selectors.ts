import { StoreState } from 'src/store';

export const selectChats = (state: StoreState) =>
    Object.keys(state.messages).map((chat) => ({
        name: chat,
    }));

export const selectMessages = (state: StoreState) => state.messages;