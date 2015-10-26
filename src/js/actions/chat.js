import api from '../api/chat';

export const SEND_MESSAGE_START   = 'SEND_MESSAGE_START';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILED  = 'SEND_MESSAGE_FAILED';
function send_message(message) {
  return function (dispatch, getState) {
    const { auth } = getState();

    dispatch(sendMessageStart(message));

    api.sendMessage(auth.user.id, message, (err, messageData) => {
      if (err) {
        dispatch(sendMessageFailed(err));
      } else {
        dispatch(sendMessageSuccess(messageData.message));
      }
    });
  };
}

function sendMessageStart(message) {
  return {
    type: SEND_MESSAGE_START,
    payload: {
    	message
    }
  };
}

function sendMessageSuccess(message) {
  return {
    type: SEND_MESSAGE_SUCCESS,
    payload: {
      message
    }
  };
}

function sendMessageFailed(error) {
  return {
    type: SEND_MESSAGE_FAILED,
    payload: {
      error
    }
  };
}

export const FETCH_USERS_START   = 'FETCH_USERS_START';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILED  = 'FETCH_USERS_FAILED';
function fetch_users() {
  return function (dispatch, getState) {
    dispatch(fetchUsersStart());

    api.fetchUserList((err, usersData) => {
      if (err) {
        dispatch(fetchUsersFailed(err));
      } else {
        dispatch(fetchUsersSuccess(usersData.users));
      }
    });
  };
}

function fetchUsersStart() {
  return {
    type: FETCH_USERS_START
  };
}

function fetchUsersSuccess(users) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: {
      users
    }
  };
}

function fetchUsersFailed(error) {
  return {
    type: FETCH_USERS_FAILED,
    payload: {
      error
    }
  };
}

export const FETCH_MESSAGES_START   = 'FETCH_MESSAGES_START';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILED  = 'FETCH_MESSAGES_FAILED';
function fetch_messages() {
  return function (dispatch, getState) {
    dispatch(fetchMessagesStart());

    api.fetchMessageList((err, messagesData) => {
      if (err) {
        dispatch(fetchMessagesFailed(err));
      } else {
        dispatch(fetchMessagesSuccess(messagesData.messages));
      }
    });
  };
}

function fetchMessagesStart() {
  return {
    type: FETCH_MESSAGES_START
  };
}

function fetchMessagesSuccess(messages) {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    payload: {
      messages
    }
  };
}

function fetchMessagesFailed(error) {
  return {
    type: FETCH_MESSAGES_FAILED,
    payload: {
      error
    }
  };
}

export default {
  send_message,
  fetch_users,
  fetch_messages
};
