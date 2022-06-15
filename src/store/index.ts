import { createStore, compose, combineReducers } from 'redux';
import { profileReducer } from './profile/reducer';
import { messageReducer } from './messages/reducer';

export const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type StoreState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  profile: profileReducer,
  messages: messageReducer,
});

export const store = createStore(rootReducer, composeEnhancers());