import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { profileReducer } from './profile/slice';
import { messageReducer } from './messages/reducer';
import { articlesReducer } from './articles/slice';

export type StoreState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  profile: profileReducer,
  messages: messageReducer,
  articles: articlesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
