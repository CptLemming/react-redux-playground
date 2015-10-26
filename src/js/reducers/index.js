import { combineReducers } from 'redux';
import auth from './auth';
import counter from './counter';
import chat from './chat';
import { routerStateReducer as router } from 'redux-router';

export default combineReducers({
  auth,
  counter,
  chat,
  router
});
