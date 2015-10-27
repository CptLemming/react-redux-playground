import { createSelector } from 'reselect';
import moment from 'moment';

function formatMessages(messages, users) {
  return messages.map((message) => {
    const user = users.find((user) => user.id === message.userId) || { username: 'Unknown' };
    const createdAt = moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a');

    return {
      ...message,
      createdAt,
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
