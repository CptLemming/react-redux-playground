export default {
  sendMessage(userId, message, cb) {
    fetch('/api/message', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, message })
    }).then((response) => {
        if (response.status >= 400) {
          const err = new Error("Bad response from server");
          if (cb) {
            cb(err);
            return err;
          }
          throw err;
        }
        return response.json();
      }).then((response) => {
        if (cb) {
          cb(null, response)
        } else {
          return response;
        }
      });
  },

  fetchUserList(cb) {
    return fetch('/api/users')
      .then(function(response) {
        if (response.status >= 400) {
          const err = new Error("Bad response from server");
          if (cb) {
            cb(err);
            return;
          }
          throw err;
        }
        return response.json();
      })
      .then(function(response) {
        if (cb) {
          cb(null, response);
        } else {
          return;
        }
      });
  },

  fetchMessageList(cb) {
    return fetch('/api/messages')
      .then(function(response) {
        if (response.status >= 400) {
          const err = new Error("Bad response from server");
          if (cb) {
            cb(err);
            return;
          }
          throw err;
        }
        return response.json();
      })
      .then(function(response) {
        if (cb) {
          cb(null, response);
        } else {
          return;
        }
      });
  }
}
