import { combineReducers } from 'redux';
import { createReducer } from '../utils';
import {
  SEND_MESSAGE_START, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILED,
  FETCH_MESSAGES_START, FETCH_MESSAGES_SUCCESS, FETCH_MESSAGES_FAILED,
  FETCH_USERS_START, FETCH_USERS_SUCCESS, FETCH_USERS_FAILED,
} from '../actions/chat';
import { LOGOUT_SUCCESS } from '../actions/auth';

const initialState = {
  isSendingMessage: false,
  messages: [],
  users: []
};

const sendingMessageReducer = createReducer(initialState.isSendingMessage, {
  [SEND_MESSAGE_START]: () => true,
  [SEND_MESSAGE_SUCCESS]: () => false,
  [SEND_MESSAGE_FAILED]: () => false
});

const messagesReducer = createReducer(initialState.messages, {
  [SEND_MESSAGE_SUCCESS]: (state, action) => state.concat(action.message),
  [FETCH_MESSAGES_SUCCESS]: (state, action) => action.messages
});

const usersReducer = createReducer(initialState.users, {
  [FETCH_USERS_SUCCESS]: (state, action) => action.users,
  [LOGOUT_SUCCESS]: (state, action) => state.filter((user) => user.id !== action.userId)
});

export default combineReducers({
  isSendingMessage: sendingMessageReducer,
  messages: messagesReducer,
  users: usersReducer
});
