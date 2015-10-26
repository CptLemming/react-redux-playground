import { createSelector } from 'reselect'

function formatMessages(messages, users) {
  return messages.map((message) => {
    const user = users.find((user) => user.id === message.userId) || { username: 'Unknown' };
    return {
      ...message,
      user
    }
  });

  return messages;
}

const usersSelector = state => state.chat.users;
const messagesSelector = state => state.chat.messages;

const chatSubSelector = createSelector(
  usersSelector,
  messagesSelector,
  (users, messages) => {
    return {
      users: users,
      messages: formatMessages(messages, users)
    }
  }
)

const routerSelector = state => state.router;

export const chatSelector = createSelector(
  chatSubSelector,
  routerSelector,
  (chat, routerState) => {
    return {
      chat,
      routerState
    }
  }
);
