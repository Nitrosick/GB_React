import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { profileReducer } from './profile/slice';
import { messageReducer } from './messages/reducer';
import { articlesReducer } from './articles/slice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
};

export type StoreState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  profile: profileReducer,
  messages: messageReducer,
  articles: articlesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
