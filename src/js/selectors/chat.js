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

export const chatSelector = createSelector(
  usersSelector,
  messagesSelector,
  (users, messages) => ({
      users,
      messages: formatMessages(messages, users)
    }
  )
);
