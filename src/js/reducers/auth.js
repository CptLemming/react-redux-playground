import { combineReducers } from 'redux';
import { createReducer } from '../utils';
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_SUCCESS } from '../actions/auth';

const initialState = {
  user: localStorage.user ? JSON.parse(localStorage.user) : null,
  isLoggedIn: !!localStorage.user,
  isLoggingIn: false,
  loginError: null
};

export default createReducer(initialState, {
  [LOGIN_START]: (state, action) => Object.assign({}, state, { isLoggingIn: true, loginError: false }),
  [LOGIN_SUCCESS]: (state, action) => {
  	localStorage.setItem('user', JSON.stringify(action.user));
  	return Object.assign({}, state, { isLoggingIn: false, isLoggedIn: true, user: action.user })
  },
  [LOGIN_FAILED]: (state, action) => Object.assign({}, state, { isLoggingIn: false, isLoggedIn: false, user: null, loginError: action.error }),
  [LOGOUT_SUCCESS]: (state) => {
  	localStorage.removeItem('user');
  	return Object.assign({}, state, { user: null, isLoggedIn: false });
  }
});
