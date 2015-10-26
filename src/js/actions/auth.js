import api from '../api/auth';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
function login(username, password) {
  return function (dispatch, getState) {
    dispatch(loginStart());

    api.login(username, password, (err, userData) => {
      if (err) {
        dispatch(loginFailed(err));
      } else {
        dispatch(loginSuccess(userData));
      }
    });
  };
}

function loginStart() {
  return {
    type: LOGIN_START
  };
}

function loginSuccess(userData) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      user: userData
    }
  };
}

function loginFailed(err) {
  return {
    type: LOGIN_FAILED,
    payload: {
      error: err
    }
  };
}

export const LOGOUT_START   = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED  = 'LOGOUT_FAILED';
function logout() {
  return function (dispatch, getState) {
    var { auth } = getState();

    dispatch(logoutStart());

    api.logout(auth.user.id, (err) => {
      if (err) {
        dispatch(logoutFailed(err));
      } else {
        dispatch(logoutSuccess(auth.id));
      }
    });
  };
}

function logoutStart() {
  return {
    type: LOGOUT_START
  };
}

function logoutSuccess(userId) {
  return {
    type: LOGOUT_SUCCESS,
    payload: {
      userId
    }
  };
}

function logoutFailed(err) {
  return {
    type: LOGOUT_FAILED,
    payload: {
      error: err
    }
  };
}

export default {
  login,
  logout
};
